
const router = require("express").Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const {createChat , deleteChat , getChats, getMessages} = require("../controllers/chatController");

router.get("/message/:id" , authMiddleware , getMessages);
router.get("/" , authMiddleware , getChats);
router.post("/create" , authMiddleware, createChat);

router.post("/delete" ,authMiddleware, deleteChat);

module.exports = router;
