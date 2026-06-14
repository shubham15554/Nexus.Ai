const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {registerUser , login , getProfile , logout} = require("../controllers/authController");
const generateToken = require("../utils/generateToken");

router.post("/register" , registerUser);
router.post("/login" , login);
router.get("/profile" , getProfile)
router.post("/logout" , logout);
module.exports = router;