const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const  { GoogleGenAI }  = require("@google/genai");

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
async function generateContent(data) {
  try{
    const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: data,
  });

  return response.text;
  }
  catch(err){
   console.log(err);
   return "Something went wrong";
  }
  
}




async function generateVector(content){

  const response = await ai.models.embedContent({
      model: 'gemini-embedding-2',
      contents: content,
      config:{
          outputDimensionality: 768
      }


  });
  return response.embeddings[0].values
  
}
module.exports = {
    generateContent,
    generateVector
};
