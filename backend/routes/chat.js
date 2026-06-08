
const router = require("express").Router();
const User = require("../models/user");
const authmiddleware = require("../middleware/authMiddleware");
const {createChat , deleteChat , getChats, getMessages} = require("../controllers/chatController");

router.get("/message/:id" , authmiddleware , getMessages);
router.get("/" , authmiddleware , getChats);
router.post("/create" , authmiddleware, createChat);

router.post("/delete" ,authmiddleware, deleteChat);

module.exports = router;
