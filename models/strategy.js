const mongoose = require('mongoose');

const strategySchema = new mongoose.Schema({
    products :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    totalPrice:{
        type:Number,
        required: true,
    },
    totalCost:{
        type:Number,
        required: true,
    },
    startingDate:{
        type:Date,
        required: true,
    },
    endingDate:{
        type:Date,
        required: true,
    },
    title:{
        type:String,
        required:true,
    },
});

const Strategy = mongoose.model('Strategy', strategySchema);

module.exports = Strategy;