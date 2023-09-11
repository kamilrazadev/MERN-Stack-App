const async = require('hbs/lib/async');
const { Brand } = require('./Model');
const { connect } = require('mongoose');
require('dotenv').config();


const addBrand = async (req, res) => {

    const {BrandName, BrandImg} = req.body

    if(!BrandName || !BrandImg){
        res.json({
            message: "All Values are Required"
        })
    } else {
        try {

            await connect(process.env.MONGO_URL);
            console.log('DB Connected') 

            await Brand.create({BrandName, BrandImg})
            res.status(201).json({
                message: "Brand Added"
            })
            
        } catch (error) {
            res.json({
                message: error.message
            }) 
        }
    }
}

const getAllBrands = async (req, res) => {
    try {

        await connect(process.env.MONGO_URL);
        console.log('DB Connected') 

        const brands = await Brand.find()
        res.status(200).json({
            brands
        })
        
    } catch (error) {
        res.json({
            message: error.message
        }) 
    }
}

const deleteBrand = async (req, res) => {
    const brandId = req.params.brandId;

    try {
        await connect(process.env.MONGO_URL);
        console.log('DB Connected');

        // Delete the brand by ID
        await Brand.findByIdAndDelete(brandId);
        res.status(200).json({
            message: "Brand deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = { addBrand, getAllBrands, deleteBrand }