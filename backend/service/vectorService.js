
const { Pinecone }  = require('@pinecone-database/pinecone')

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const chatGptIndex = pc.Index("chat-gpt");

async function createMemory({vectors , metadata , messageId}) {
    
     try{
        await chatGptIndex.upsert({
        records: [
            {
                id: messageId,
                values: vectors,
                metadata: metadata
            }
        ]
        });
    }
    catch(error){
        console.log(error);
    }
}


async function queryMemory({queryVector , limit = 5 , metadata}){ 
   try{
     const queryResponse = await chatGptIndex.query({
        
        vector: queryVector,
        topK: limit,
        filter: metadata  ? metadata : undefined,
        includeMetadata: true
        
    });
    return queryResponse.matches;
   }
   catch(error){
    console.log(error);
   }
}

module.exports = {
    createMemory,
    queryMemory
}