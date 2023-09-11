const app = require('express');
const router = app.Router();

const { addCategory, categoryById, getAllCategory, deleteCategory } = require('./Controller')

router.post('/add-category', addCategory)
router.get('/get-all-category', getAllCategory)
 router.delete('/delete-category/:categoryId', deleteCategory);

module.exports = router