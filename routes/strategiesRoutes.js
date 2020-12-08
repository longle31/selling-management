const express = require('express');
const { get_all_strategies, add_a_strategy, update_a_strategy, delete_a_strategy } = require('../controllers/strategiesController');

const router = express.Router();

router.get('/strategies', get_all_strategies);
router.post('/strategies', add_a_strategy);
router.put('/strategies/:id', update_a_strategy);
router.delete('/strategies/:id', delete_a_strategy);

module.exports = router;