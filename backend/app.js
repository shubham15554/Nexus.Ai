const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const httpServer = require('http').createServer(app);
const cookieParser = require("cookie-parser");
const initializeSocketServer = require("./socket/socketServer");
initializeSocketServer(httpServer);







const authRoute = require('./routes/auth');
const chatRoute = require('./routes/chat');


app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
));

app.get("/random" , (req , res)=>{
  console.log("coming");
  res.json({msg:"fasdfa"});
})

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth" , authRoute);
app.use("/api/chat" , chatRoute);





const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
    httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  
    
};

startServer();




