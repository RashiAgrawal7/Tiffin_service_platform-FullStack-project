const orderModel = require('../models/order-model.js');
const userModel = require('../models/user-model.js')
// const stripe = require("stripe");

module.exports.placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:5173";

    try{
        // if (
        //     !address ||
        //     !address.firstname ||
        //     !address.lastname ||
        //     !address.Country ||
        //     !address.House_numberStreet_name ||
        //     !address.Town_city ||
        //     !address.State ||
        //     !address.pincode
        // ) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Incomplete address. Please provide all required fields.",
        //     });
        // }

        const newOrder = await orderModel.create({
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();

        emptyCart = {}
        for(let i=1;i<300+1;i++){
            emptyCart[i] = 0;
        }

        // console.log("Empty cart: ",emptyCart);
        

        let user = await userModel.findByIdAndUpdate(req.user.id,{cartData:emptyCart})
        console.log(user.cartData);

        await user.save();
        

        res.json({success:true,message: "order created successfully"});

    }catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// Creating usersOrders for frontend

module.exports.usersOrders = async (req,res) =>{
    try{
        const orders = await orderModel.find({userId:req.user.id})
        // console.log(orders);
        res.json({success:true,data:orders})
    }catch(error){
        console.error(error);
        res.json({success:false,message:"Error"})
    }
    
}

// Creating api to list orders for admin panel

module.exports.listOrders = async (req,res) =>{
    try{
        const allOrders = await orderModel.find();
        res.json({success:true,data:allOrders});
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
    
}

// api for updating order status

module.exports.updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"}) 
    }
}


