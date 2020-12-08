const { add_a_account } = require('../controllers/accountController');

const router = require('express').Router();


// router.get('/accounts');
router.post('/accounts', add_a_account);


module.exports = router;