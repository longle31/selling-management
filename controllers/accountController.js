const Account = require('./../models/account');
const add_a_account = (req, res) =>{
    const account = new Account(req.body);
    account.save()
        .then(account => res.json({account}))
        .catch(error => res.json({error}));
}

module.exports= {add_a_account};