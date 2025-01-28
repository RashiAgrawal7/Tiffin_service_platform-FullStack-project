const userModel = require('../models/user-model.js');
const jwt = require('jsonwebtoken');
const {generatedToken} = require('../utils/generateToken.js')

module.exports.registerUser = async (req,res)=>{

    const check = await  userModel.findOne({email:req.body.email});
    if(check) return res.status(400).json({success: false,errors: 'Existing user with same Email address'});

    let cart={};
    for(let i=0;i<300;i++){
        cart[i] = 0;
    }
    let user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await user.save();

    // const data = {
    //     user:{
    //         id: user._id
    //     }
    // }

    console.log(user);
    

    const token = generatedToken(user);
    res.json({success:true,token})
}

module.exports.loginUser = async (req,res)=>{
    const user = await userModel.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            // const data = {
            //          user:{
            //              id:user._id
            //            }
            //          }
            let token = generatedToken(user);
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Wrong password"})
        }
    }
    else{
        res.json({sucess:false,errors:"Email id doesn't exist"})
    }
}