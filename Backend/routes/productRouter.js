const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model.js');

router.get("/",(req,res)=>{
    res.send("hey, productRouter is working");
})

router.post("/addproduct", async (req,res)=>{
    // {id ,name ,location ,image ,delivery_time ,approx_price , cuisine} = req.body;
    let products = await productModel.find({});
    let id;
    if(products.length>0){
        let products_last_arry = products.slice(-1);
        let last_product = products_last_arry[0];
        id = last_product.id+1; 
    }
    else{
        id = 1;
    }

    const product = new productModel({
        id: id,
        name: req.body.name,
        location: req.body.location,
        image: req.body.image,
        delivery_time: req.body.delivery_time,
        cuisine: req.body.cuisine,
        approx_price: req.body.approx_price
    });

    console.log(product);
    await product.save();
    console.log('saved');
    res.json({
        success:1,
        name: req.body.name,
    })   
})

router.post("/removeproduct",async (req,res)=>{
    await productModel.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: 1,
        name: req.body.name,
    })
}) 

router.get("/allproducts",async (req,res)=>{
    let products = await productModel.find({});
    console.log('All products fetched');
    res.send(products);
})

router.get("/relatedproducts",async (req,res)=>{
    try{
        const {id} = req.query;
        // console.log("id fetched from query: ",{id});
        
    if(!id){return res.status(404).send({error:"Product ID is required"})
    }
    const product = await productModel.findOne({id})
    if(!product){return res.status(404).send({error:"Product not found"});
    }
    const products = await productModel.find({location:product.location})
    const relatedproducts = products.slice(0,4);
    console.log("Related Products Fetched");
    res.status(200).send(relatedproducts);
    } catch(error){
        console.error("Error fetching Related products",error);
        res.status(500).send({error:"Internal server error"});
    }
    
})

module.exports = router;