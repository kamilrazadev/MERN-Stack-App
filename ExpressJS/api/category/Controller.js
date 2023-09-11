const async = require('hbs/lib/async');
const { Category } = require('./Model');
const { connect } = require('mongoose');
require('dotenv').config();


const addCategory = async (req, res) => {

    const {CategoryName, CategoryImg} = req.body

    if(!CategoryName || !CategoryImg){
        res.json({
            message: "All Values are Required"
        })
    } else {
        try {

            await connect(process.env.MONGO_URL);
            console.log('DB Connected') 

            await Category.create({CategoryName, CategoryImg})
            res.status(201).json({
                message: "Category Added"
            })
            
        } catch (error) {
            res.json({
                message: error.message
            }) 
        }
    }
}

const getAllCategory = async (req, res) => {
    try {

        await connect(process.env.MONGO_URL);
        console.log('DB Connected') 

        const category = await Category.find()
        res.status(200).json({
            category
        })
        
    } catch (error) {
        res.json({
            message: error.message
        }) 
    }
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        await connect(process.env.MONGO_URL);
        console.log('DB Connected');

        // Delete the category by ID
        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({
            message: "category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { addCategory, getAllCategory, deleteCategory }