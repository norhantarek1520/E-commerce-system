const express = require('express');
const router = express();
const { CartController } = require('../Controllers/CartController');
const { isAuthorized } = require('../Middlewares/isAuthorizedMiddleware')



router.get('/', isAuthorized ,CartController.getCart);
router.delete('/', isAuthorized,CartController.clearCart)
router.post('/:product_id' , isAuthorized ,CartController.addProductToCart)
router.delete('/:product_id' , isAuthorized, CartController.removeSpecificCartItem)


module.exports = router;