const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    ProductName : {
        type : String,
        required: true
    },
    ProductCategory :{
        type : String,
        required: true
    },
    ProductBrand : {
        type : String,
        required: true
    },
    ProductPrice : {
        type : String,
        required: true
    },
    ProductDiscription : {
        type : String,
        required: true        
    },
    ProductStock : {
        type : String,
        required: true    
    },
    ProductRating : {
        type : String,
        required: true
    },
    ProductImg : {
        type : String,
        required: true
    }
})

const Product = model('product', ProductSchema);

module.exports = { Product }