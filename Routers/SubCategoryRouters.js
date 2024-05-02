const express = require('express');
const router = express();
const {SubCategoryController} = require('../Controllers/SubCategoryController')
const { createSubCategoryValidator , deleteSubCategoryValidator , getSubCategoryValidator , updateSubCategoryValidator} = require('../Shared/Validator/subCategoryValidator') 
const  {isAdmin} = require('../Middlewares/isAdminMiddleware')

router.post('/', isAdmin ,createSubCategoryValidator ,SubCategoryController.createSubCategory )
router.get('/' ,SubCategoryController.getAllSubCategories)
router.get('/:id' ,getSubCategoryValidator,SubCategoryController.getSubCategory)
router.get('/category/:id' ,getSubCategoryValidator,SubCategoryController.getSubCategoryInCategory) // this id for category
router.put('/:id' , isAdmin ,updateSubCategoryValidator ,SubCategoryController.updateSubCategory)
router.delete('/:id' , isAdmin ,deleteSubCategoryValidator ,SubCategoryController.deleteSubCategory)
module.exports = router;