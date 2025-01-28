const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model.js');
const {fetchUser} = require('../middleware/fetchUser.js')

router.post("/addtocart",fetchUser,async (req,res)=>{
    // jwt.verify(req.headers.auth-token)
    console.log("Added",req.body.itemId);
    console.log(req.body,req.user);
    const userdata = await userModel.findOne({_id:req.user.id});
    // console.log(user);
    userdata.cartData[req.body.itemId] += 1

    await userModel.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});

    res.send("Added");
})

router.post("/removefromcart",fetchUser,async (req,res)=>{
    // console.log(req.body,req.user);
    console.log("Removed",req.body.itemId);
    
    const userdata = await userModel.findOne({_id:req.user.id});
    // console.log(user);
    if(userdata.cartData[req.body.itemId]>0)
    userdata.cartData[req.body.itemId] -= 1

    await userModel.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});

    res.send("Removed");
})

router.post("/getcart",fetchUser,async (req,res)=>{
    console.log("Getcart");
    
    const user = await userModel.findOne({_id:req.user.id});
    res.json(user.cartData);
})



module.exports = router;