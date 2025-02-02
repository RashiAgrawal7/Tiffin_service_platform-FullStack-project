const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    id:{
        type: Number,
        required:true,
    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    location:{
        type: String,
        required:true,
    },
    delivery_time:{
        type: String,
        required:true,
    },
    cuisine:{
        type: String,
        required:true,
    },
    approx_price:{
        type: Number,
        required:true,
    },
    // Phone_Number:{
    //     type: Number,
    //     required:true,
    // },
    Date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default:true,
    },
    phone_number: {
        type: String
    }
})

module.exports = mongoose.model("product",productSchema);