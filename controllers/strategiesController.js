const Strategy = require('../models/strategy');

const get_all_strategies = async (req, res)=>{
    try {
        const strategies = await Strategy.find();
        res.json({error: 'get_all_strategies_successfully', strategies});
    } catch (error) {
        res.json({error: 'get_all_strategies_failed: '+error.message});
    }
}

const add_a_strategy = async (req, res)=>{
    try {
        console.log(req.body.strategy);
        const strategy = await Strategy.create(req.body.strategy);
        if(strategy)
        res.json({error: 'add_a_strategy_successfully', strategy});
        res.status(404).json({error: 'add_a_strategy_failed: '+error.message});
    } catch (error) {
        res.status(404).json({error: 'add_a_strategy_failed: '+error.message});
    }
}
const update_a_strategy = async (req, res)=>{
    try {
        const strategy = await Strategy.findOneAndUpdate({_id: req.params.id}, req.body.strategy);
        res.json({error: 'update_a_strategy_successfully', strategy});
    } catch (error) {
        res.json({error: 'update_a_strategy_failed: '+error.message});
    }
}
const delete_a_strategy = async (req, res)=>{
    try {
        const strategy = await Strategy.findOneAndDelete({_id: req.params.id});
        res.json({error: 'get_all_strategies_successfully', strategy});
    } catch (error) {
        res.status(404).json({error: 'get_all_strategies_failed: '+error.message});
    }
}

module.exports = {get_all_strategies, add_a_strategy, update_a_strategy, delete_a_strategy};