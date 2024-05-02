const express = require('express');
const router = express();
const {CategoryController} = require('../Controllers/CategoryController')
const {categoryIdValidator , createCategoryValidator} = require('../Shared/Validator/categoriesValidator') 
const  {isAdmin} = require('../Middlewares/isAdminMiddleware')


router.post('/', isAdmin ,createCategoryValidator ,CategoryController.createCategory )
router.get('/' ,CategoryController.getAllCategories)
router.get('/:id' ,categoryIdValidator,CategoryController.getCategory)
router.put('/:id' , isAdmin ,categoryIdValidator ,CategoryController.updateCategory)
router.delete('/:id' , isAdmin ,categoryIdValidator ,CategoryController.deleteCategory)
router.put('/:id' , isAdmin  ,CategoryController.uploadCategoryImage)
router.put('/:id' , isAdmin  ,CategoryController.resizeImage)
module.exports = router;