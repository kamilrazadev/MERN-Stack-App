const app = require('express');
const router = app.Router();

const { addBrand, deleteBrand, getAllBrands } = require('./Controller')

router.post('/add-brand', addBrand)
router.get('/get-all-brands', getAllBrands)
router.delete('/delete-brand/:categoryId', deleteBrand);


module.exports = router