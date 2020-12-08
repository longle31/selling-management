const Product = require('../models/product');
const { param } = require('../routes/productsRoutes');

const get_all_products = async (req, res) =>{
    try {
        const products = await Product.find();
        res.json({error: 'get_products_successfully', products});
    } catch (error) {
        res.status(404).json({error:'get_products_failed'});
    }

}

const add_a_product = async (req, res) =>{
    try {
        console.log(req.body.product);
        const product = await Product.create(req.body.product);
        res.status(200).json({error: 'add_a_product_successfully', product});
    } catch (error) {
        // console.log(error);
        res.status(404).json({error:'add_a_product_failed'});
    }

}


const update_a_product = async (req, res)=>{
    try {
        const product = await Product.findOneAndUpdate({_id: req.params._id}, req.body.product);
        res.json({error: 'udpate_product_successfully', product})

    } catch (error) {
        res.status(404).json({error: 'udpate_product_failed'});
    }
}

const delete_a_product = async (req, res)=>{
    try {
        const product = await Product.findOneAndDelete({_id: req.params._id}, req.body.product);
        res.json({error: 'delete_product_successfully', product})

    } catch (error) {
        res.status(404).json({error: 'delete_product_failed'});
    }
}

module.exports= {get_all_products, delete_a_product, add_a_product, update_a_product}