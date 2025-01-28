const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports.fetchUser = (req,res,next) => {
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Token not found"})
    }
    else{
        try{
            const data = jwt.verify(token,process.env.JWT_KEY);
            req.user = data.user;
            next();
        }
        catch(error){
            res.status(401).send({error:"Please authenticate using valid token"});
        }
    }
}