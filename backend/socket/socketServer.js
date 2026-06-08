const {Server} = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookie = require("cookie");
const {generateContent , generateVector} = require("../service/aiService");
const { createMemory , queryMemory } = require("../service/vectorService");
const Message = require("../models/message");
const { text } = require("express");
const message = require("../models/message");
const user = require("../models/user");

const Chat = require("../models/chat");
// Standalone Helper Function for Background Title Generation
async function generateAndEmitChatTitle(io , chatId, firstUserPrompt) {
    try {
        const currentChat = await Chat.findById(chatId);
  
        if (currentChat && currentChat.title === "New Chat") {
            console.log(`[Title Engine] Generating title for chat: ${chatId}`);
            
            const titlePrompt = [
                {
                    role: "user",
                    parts: [{ 
                        text: `Instruction: You are a title generator. Generate a concise, smart 3 to 5 words title for the following user prompt. Do not use markdown, quotes, or formatting. Return ONLY the title string.\n\nUser Prompt: ${firstUserPrompt}` 
                    }]
                }
            ];
            
            let generatedTitle = await generateContent(titlePrompt);
             
            if (generatedTitle) {
                currentChat.title = generatedTitle;
                await currentChat.save();
                io.emit("chat-title-updated", { 
                    chatId: chatId, 
                    title: generatedTitle 
                });
                console.log(`[Title Engine] Title successfully updated to: "${generatedTitle}"`);
            } 
        }
    } catch (titleError) {
        console.error("[Title Engine] Error generating background title:", titleError);
    }
}







function initializeSocketServer(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.use( async (socket, next) => {
      
        const cookieHeader = socket.handshake.headers?.cookie || '';
        const token = cookie.parse(cookieHeader)?.token;
        
        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }
        
        try{
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return next(new Error("Authentication error: User not found"));
            }
            socket.user = user;
            next();
        } catch (error) {
            return next(new Error("Authentication error: Invalid token"));
        }
    })

    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.user);

        socket.on("ai-message" , async (data)=>{
            console.log("message is coming " , data);
            const [message , vectors] = await Promise.all([
                Message.create({
                    content: data.content,
                    user: socket.user._id,
                    chat: data.chat,
                    role: "user"
                }),  
                generateVector(data.content),
            ]);

            await createMemory({
                    vectors: vectors,
                    metadata: {
                        chat: data.chat,
                        user: socket.user._id,
                        text: message.content
                    },
                    messageId: message._id.toString(),
            })
             
            const [memory , chatHistory] = await Promise.all([
                queryMemory({
                    queryVector: vectors,
                    limit: 3,
                    metadata: {
                        user: socket.user._id,
                    }
                }),
                Message.find({ chat: data.chat })
                .sort({ createdAt: -1 })
                .limit(10)
                .lean()
                .then(messages => messages.reverse())
            ])


            const stm = chatHistory.map((item)=>{
                return {
                    role : item.role,
                    parts: [{text: item.content}]
                }
            });
            const vectorMatches = memory?.matches || (Array.isArray(memory) ? memory : []);
            const ltm = vectorMatches.map((item) => {
                return {
                    role: "system",
                    parts: [{
                        text: `This is a relevant context snippet from a previous user conversation:\n${item.metadata.text}`
                    }]
                };
            });
            
 

            let res = await generateContent([...ltm , ...stm]);


            socket.emit("ai-response" , {
                content: res,
                chat: data.chat, 
            });

            const [aiMessage , resVectors] = await Promise.all([
                Message.create({
                    content: res,
                    user: socket.user._id,
                    chat: data.chat,
                    role: "model"
                }),
                generateVector(res)
            ]);

           

            await createMemory({
                vectors: resVectors,
                metadata: {
                    chat: data.chat,
                    user: socket.user._id,
                    text: aiMessage.content
                },
                messageId: aiMessage._id,
                
            });

            
            console.log("Emitted AI response: ", res);
            generateAndEmitChatTitle(io , data.chat ,   data.content);
            
        });


    });


}

module.exports = initializeSocketServer;
