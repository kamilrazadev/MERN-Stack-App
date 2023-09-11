const { Schema, model } = require('mongoose');

const BrandSchema = new Schema({
    BrandName : {
        type : String,
        required: true
    },
    BrandImg : {
        type : String,
        required: true
    }
})

const Brand = model('brand', BrandSchema);

module.exports = { Brand }