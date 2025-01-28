require('dotenv').config();
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const db = require('./config/mongoose-connection.js');
// const productModel = require('./models/product-model.js')
// const userModel = require('./models/user-model.js')
const productRouter = require('./routes/productRouter.js')
const userRouter = require('./routes/userRouter.js')
const cartRouter = require('./routes/cartRouter.js')
const orderRouter = require('./routes/orderRouter.js')
// const expressSession = require('express-session');
// const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
// const jwt = require('jsonwebtoken');
const cors = require('cors');
const { type } = require('os');
const { log } = require('console');


// app.use(
//     expressSession({
//         resave:false,
//         saveUninitialized: false,
//         secret: process.env.EXPRESS_SESSION_SECRET,
//     })
// )

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/products",productRouter);
app.use("/users",userRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);

// API Creation 

app.get("/",(req,res)=>{
    res.send('Express App is running')
})

// Image storage engine

const storage = multer.diskStorage({
    destination: '/upload/images',
    filename: (req,file,cb)=>{
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage:storage});

// Creating upload endpoint for images

app.use('/images',express.static('/upload/images'));

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// app.post("/addproduct", async (req,res)=>{
//     // {id ,name ,location ,image ,delivery_time ,approx_price , cuisine} = req.body;
//     let products = await productModel.find({});
//     let id;
//     if(products.length>0){
//         let products_last_arry = products.slice(-1);
//         let last_product = products_last_arry[0];
//         id = last_product.id+1; 
//     }
//     else{
//         id = 1;
//     }

//     const product = new productModel({
//         id: id,
//         name: req.body.name,
//         location: req.body.location,
//         image: req.body.image,
//         delivery_time: req.body.delivery_time,
//         cuisine: req.body.cuisine,
//         approx_price: req.body.approx_price
//     });

//     console.log(product);
//     await product.save();
//     console.log('saved');
//     res.json({
//         success:1,
//         name: req.body.name,
//     })   
// })

// Creating API for deleting products

// app.post("/removeproduct",async (req,res)=>{
//     await productModel.findOneAndDelete({id: req.body.id});
//     console.log("Removed");
//     res.json({
//         success: 1,
//         name: req.body.name,
//     })
// })

// Creating API for fetching all products

// app.get("/allproducts",async (req,res)=>{
//     let products = await productModel.find({});
//     console.log('All products fetched');
//     res.send(products);
// })

// Creating API endpoint for registering user

// app.post('/Signup',async (req,res)=>{

//     const check = await  userModel.findOne({email:req.body.email});
//     if(check) return res.status(400).json({success: false,errors: 'Existing user with same Email address'});

//     let cart={};
//     for(let i=0;i<300;i++){
//         cart[i] = 0;
//     }
//     let user = new userModel({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         cartData: cart
//     })

//     await user.save();

//     const data = {
//         user:{
//             id: user._id
//         }
//     }

//     console.log(user);
    

//     const token = jwt.sign(data,'secret_ecom');
//     res.json({success:true,token})
// })

// app.post('/login', async (req,res)=>{
//     const user = await userModel.findOne({email:req.body.email});
//     if(user){
//         const passCompare = req.body.password === user.password;
//         if(passCompare){
//             const data = {
//                      user:{
//                          id:user._id
//                        }
//                      }
//             let token = jwt.sign(data,'secret_ecom');
//             res.json({success:true,token})
//         }
//         else{
//             res.json({success:false,errors:"Wrong password"})
//         }
//     }
//     else{
//         res.json({sucess:false,errors:"Email id doesn't exist"})
//     }
// })

// Creating endpoint for RelatedProducts 

// app.get("/relatedproducts",async (req,res)=>{
//     try{
//         const {id} = req.query;
//         // console.log("id fetched from query: ",{id});
        
//     if(!id){return res.status(404).send({error:"Product ID is required"})
//     }
//     const product = await productModel.findOne({id})
//     if(!product){return res.status(404).send({error:"Product not found"});
//     }
//     const products = await productModel.find({location:product.location})
//     const relatedproducts = products.slice(0,4);
//     console.log("Related Products Fetched");
//     res.status(200).send(relatedproducts);
//     } catch(error){
//         console.error("Error fetching Related products",error);
//         res.status(500).send({error:"Internal server error"});
//     }
    
// })

// Creating middleware to fetch user from the auth-token

// const fetchUser = (req,res,next) => {
//     const token = req.header('auth-token')
//     if(!token){
//         res.status(401).send({error:"Token not found"})
//     }
//     else{
//         try{
//             const data = jwt.verify(token,'secret_ecom');
//             req.user = data.user;
//             next();
//         }
//         catch(error){
//             res.status(401).send({error:"Please authenticate using valid token"});
//         }
//     }
// }

// Creating an api to add items to users cart

// app.post("/addtocart",fetchUser,async (req,res)=>{
//     // jwt.verify(req.headers.auth-token)
//     console.log("Added",req.body.itemId);
//     console.log(req.body,req.user);
//     const userdata = await userModel.findOne({_id:req.user.id});
//     // console.log(user);
//     userdata.cartData[req.body.itemId] += 1

//     await userModel.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});

//     res.send("Added");
// })

// app.post("/removefromcart",fetchUser,async (req,res)=>{
//     // console.log(req.body,req.user);
//     console.log("Removed",req.body.itemId);
    
//     const userdata = await userModel.findOne({_id:req.user.id});
//     // console.log(user);
//     if(userdata.cartData[req.body.itemId]>0)
//     userdata.cartData[req.body.itemId] -= 1

//     await userModel.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});

//     res.send("Removed");
// })

// Creating api to get cart

// app.post("/getcart",fetchUser,async (req,res)=>{
//     console.log("Getcart");
    
//     const user = await userModel.findOne({_id:req.user.id});
//     res.json(user.cartData);
// })

app.listen(port,(error)=>{
    if(!error){
        console.log('Server is running on port '+port);
    }
    else{
        console.log("Error: "+error);    
    }
})