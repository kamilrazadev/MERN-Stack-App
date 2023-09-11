    const express = require('express');
    const router = express.Router();

    const {getAllProducts, addProduct, deleteProduct} = require('./Controller');

    //getAllProducts
    router.get('/get-all-products', getAllProducts)

    //addProduct
    router.post('/addproducts', addProduct)

    // Delete a product by ID
    router.delete('/delete-product/:productId', deleteProduct);


    module.exports = router;