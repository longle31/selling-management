const { login_get, login_post, log_out } = require('../controllers/authController');

const router = require('express').Router();

router.get('/login', login_get);
router.post('/login', login_post);
router.get('/logout', log_out);

module.exports = router;