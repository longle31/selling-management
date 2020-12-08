const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
    },
    productType:{
        type:String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    cost:{
        type: Number,
        required: true,
    }
});

const product = mongoose.model('Product', productSchema);

module.exports = product;