const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/images"),
  filename: (req, file, cb) => {
     cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("hey, productRouter is working");
});

router.post("/addproduct", upload.single("image"), async (req, res) => {
  // {id ,name ,location ,image ,delivery_time ,approx_price , cuisine} = req.body;
  console.log("Uploaded File: ", req.file); // Debugging line
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }
  let products = await productModel.find({});
  let id;
  if (products.length > 0) {
    let products_last_arry = products.slice(-1);
    let last_product = products_last_arry[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  let image_filename = `${req.file.filename}`;

  const product = new productModel({
    id: id,
    name: req.body.name,
    location: req.body.location,
    image: image_filename,
    delivery_time: req.body.delivery_time,
    cuisine: req.body.cuisine,
    approx_price: Number(req.body.approx_price),
  });

  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: 1,
    name: req.body.name,
    message: "Product Added",
  });
});

router.post("/removeproduct", async (req, res) => {
  await productModel.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: 1,
    name: req.body.name,
  });
});

router.get("/allproducts", async (req, res) => {
    try{
        let products = await productModel.find({});
        console.log("All products fetched");
        res.json({success:true,data:products})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
});

router.get("/relatedproducts", async (req, res) => {
  try {
    const { id } = req.query;
    // console.log("id fetched from query: ",{id});

    if (!id) {
      return res.status(404).send({ error: "Product ID is required" });
    }
    const product = await productModel.findOne({ id });
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    const products = await productModel.find({ location: product.location });
    const relatedproducts = products.slice(0, 4);
    console.log("Related Products Fetched");
    res.status(200).send(relatedproducts);
  } catch (error) {
    console.error("Error fetching Related products", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
