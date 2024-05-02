const express = require('express');
const router = express();
const { ProductController } = require('../Controllers/ProductController');
const { createProductValidator, deleteProductValidator, getProductValidator,
 updateProductValidator , getProductByCategoryValidator, getProductBySubCategoryValidator } = require("../Shared/Validator/productValidator")
const { isAdmin } = require('../Middlewares/isAdminMiddleware')


router.post('/', isAdmin, createProductValidator, ProductController.createProduct);
router.put('/:id', isAdmin, updateProductValidator, ProductController.updateProduct)
router.delete('/:id', isAdmin, deleteProductValidator, ProductController.deleteProduct)
router.get('/', ProductController.getProducts);
router.get('/:id', getProductValidator, ProductController.getProductById)
router.get('/category/:categoryid', getProductByCategoryValidator, ProductController.getProductsByCategoryId)
router.get('/categoryName/categorySlug', ProductController.getProductsByCategoryName)
router.get('/subcategory/:subcategoryid', getProductBySubCategoryValidator, ProductController.getProductsBySubcategoryId)
router.get('/subcategorySlug/subcategory', ProductController.getProductsBySubCategoryName)


router.put('/',ProductController.uploadProductImages);
router.put('/',ProductController.resizeProductImages);

// To make nessed route
// POST   /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews/87487sfww3
// router.use('/:productId/reviews', require('./ReviewRouters'));

module.exports = router;