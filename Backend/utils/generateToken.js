const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports.generatedToken = (user) => {
    const data = {
        user:{
            id: user._id
        }
    }
    return jwt.sign(data,process.env.JWT_KEY);
}