const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    CategoryName : {
        type : String,
        required: true
    },
    CategoryImg : {
        type : String,
        required: true
    }
})

const Category = model('category', CategorySchema);

module.exports = { Category }