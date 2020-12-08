const {add_a_product, get_all_products, update_a_product, delete_a_product} = require ('../controllers/productsController');
const express = require('express');

const router = express.Router();

router.get('/products', get_all_products);
router.post('/products', add_a_product);
router.put('/products/:id', update_a_product);
router.delete('/products/:id', delete_a_product);

module.exports = router;