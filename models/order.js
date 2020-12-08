const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    totalPrice:{
        type: Number,
        required:true,
    }

});