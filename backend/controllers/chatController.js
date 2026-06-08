const Chat = require("../models/chat");
const Message = require("../models/message");

module.exports.createChat = async (req, res) => {
    try{
        
        const { title } = req.body;
        if(!title){
            return res.status(400).json({msg : "Please provide a title for the chat"});
        }

        const newChat = new Chat({
            user: req.user._id,
            title
        });

        await newChat.save();

        res.status(201).json({msg : "Chat created successfully", chat: newChat});
    }
    catch(error){
        console.error('Error creating chat:', error);
        return res.status(500).json({msg : "Internal server error"});
    }
}


module.exports.deleteChat = async (req, res) => {
    try {
        const chatId = req.body.id;
        const chat = await Chat.findOne({ _id: chatId, user: req.user._id });
        if (!chat) {
            return res.status(404).json({msg : "Chat not found"});
        }
        await Message.deleteMany({chat: chatId});
        await Chat.deleteOne({ _id: chatId, user: req.user._id });
        res.status(200).json({msg : "Chat deleted successfully"});
    }
    catch(error){
        console.error('Error deleting chat:', error);
        return res.status(500).json({msg : "Internal server error"});
    }
}


module.exports.getChats = async (req , res )=>{
    try{
        let chats = await Chat.find({user: req.user._id});
        res.status(200).json({chats : chats});
        

    }
    catch(error){
        console.log(error);
        res.status(500).json({msg : "Server Error"});
    }
}


module.exports.getMessages = async (req , res)=>{
    try{
       let chatId = req.params.id;
       console.log("message me chat id " , chatId);
       let mesgs = await Message.find({chat : chatId});
       res.status(201).json({messages: mesgs});
    }
    catch(err){
        console.log(err);
        res.status(500).json("something went wrong");
    }
}