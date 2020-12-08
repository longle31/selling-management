const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

        validate: {
            validator: (value) => {
                const emailRex = /^[a-z]{1}\w{3,}@\w+(\.\w+)+/g;
                return emailRex.test(value);
            },
            message: 'invalid email'
        },
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    }
});

const customer = mongoose.model('Customer', customerSchema);

module.exports = customer;

