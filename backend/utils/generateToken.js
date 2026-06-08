
const jwt = require("jsonwebtoken");
module.exports = function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.TOKEN_KEY, { expiresIn: '1d' });
}