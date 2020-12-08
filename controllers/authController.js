const jwt = require('jsonwebtoken');
const Account = require('../models/account');

const maxAge = 3 * 24 * 60 *60;

const createToken = (id) =>{
    return jwt.sign({id}, '11#0NG3!((',{
        expiresIn: maxAge
    });
}

const handleErrors = (err) =>{
    let errors = {username: '', password: ''};

    if(err.message === 'incorrect username'){
        errors.username = 'incorrect username';
    }
    if(err.message === 'incorrect password'){
        errors.password ='incorrect password';
    }

    return errors;
}

const login_post = async (req, res) =>{
    const {username, password} = req.body;
    try {
        const account = await Account.login(username, password);
        const token = createToken(account._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
        res.status(200).json({user: account._id});
    } catch (error) {
        res.status(400).json({errors: handleErrors(error)});
    }
}

const login_get = (req, res)=>{
    res.render('login');
}

const log_out = (req,res)=>{
    res.cookie('jwt', '', {maxAge :1});
    res.redirect('/login');
}

module.exports = {login_get, login_post, log_out}