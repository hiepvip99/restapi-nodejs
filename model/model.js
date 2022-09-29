const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    note:{
        type:String,
    },
    intoMoney:{
        type:String,
        required:true
    },
    productInfo:{
        type:[String],
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
});

const productSchema = mongoose.Schema({
    manufacturer:{
        type:String
    },
    ramRom:{
        type:[String]
    },
    price:{
        type:[String]
    },
    colors:{
        type:[String]
    },
    name:{
        type:String,
        required:true
    },
    images:{
        type:[String],
    },
    cpu:{
        type:String
    },
    gpu:{
        type:String
    },
    screen:{
        type:String
    },
    camera:{
        type:String
    },
    battery:{
        type:String
    },
    numOfSim:{
        type:String
    },
    os:{
        type:String
    },
    origin:{
        type:String
    },
    releaseTime:{
        type:String
    }
});

let Product = mongoose.model("Product", productSchema);
let Order = mongoose.model("Order", orderSchema);

module.exports = {Order, Product};