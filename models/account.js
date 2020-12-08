const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    phoneNumber:{
        type: String,
    },
    email:{
        type:String,
        validate:{
            validator:(value)=>{
                const emailRex = /^[a-z]{1}\w{3,}@\w+(\.\w+)+/g;
                return emailRex.test(value);
            },
            message: 'invalid email'
        },
    },
    address:{
        type:String,
        required: false
    }
})

const accountSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true,
    },
    password:{
        type:String,
        required: true,
        minlength: [6,'put at least 6 character for password']
    },
    user:{
        type: userSchema,
        required: false
    },
    auth:{
        type: Number,
        required: true,
        enum: [0|1], // 0 customer 1 shop owner
    }
});

accountSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

accountSchema.statics.login = async function (username, password){
    const account = await this.findOne({username});
    if(account){
        const auth = await bcrypt.compare(password, account.password);
        if(auth){
            return account;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect username');

};


const account = mongoose.model('account', accountSchema);

module.exports = account;