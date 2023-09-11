const async = require('hbs/lib/async');
const { Product } = require('./Model');
const { connect } = require('mongoose');
require('dotenv').config();


const addProduct = async (req, res) => {

    const {ProductName, ProductImg, ProductCategory, ProductBrand, ProductPrice, ProductDiscription, ProductStock, ProductRating} = req.body

    if(!ProductName || !ProductImg || !ProductCategory || !ProductBrand || !ProductPrice || !ProductDiscription || !ProductStock || !ProductRating){
        res.json({
            message: "All Values are Required"
        })
    } else {
        try {

            await connect(process.env.MONGO_URL);
            console.log('DB Connected') 

            await Product.create({ProductName, ProductImg, ProductCategory, ProductBrand, ProductPrice, ProductDiscription, ProductStock, ProductRating})
            res.status(201).json({
                message: "Product Added"
            })
            
        } catch (error) {
            res.json({
                message: error.message
            }) 
        }
    }
}

const getAllProducts = async (req, res) => {
    try {

        await connect(process.env.MONGO_URL);
        console.log('DB Connected') 

        const product = await Product.find()
        res.status(200).json({
            product
        })
        
    } catch (error) {
        res.json({
            message: error.message
        }) 
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        await connect(process.env.MONGO_URL);
        console.log('DB Connected');

        // Delete the product by ID
        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { addProduct, getAllProducts, deleteProduct };
