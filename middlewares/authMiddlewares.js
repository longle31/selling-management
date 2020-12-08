const jwt = require('jsonwebtoken');
const Account = require('./../models/account');

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, '11#0NG3!((',(err, decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                next();
            }
        });
    }else{
        res.redirect('/login');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, '11#0NG3!((', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await Account.findById({ _id: decodedToken.id });
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports  = {requireAuth, checkUser};
