const express = require('express');
const router = express();
const { CartController } = require('../Controllers/CartController');
const { isAuthorized } = require('../Middlewares/isAuthorizedMiddleware')


router.put('/:id', isAuthorized,  CartController.updateCart)
router.delete('/:id', isAuthorized, CartController.deleteCart)
router.get('/:id', isAuthorized ,CartController.getCartById);

router.post('/' , isAuthorized ,CartController.addProductToCart)
router.get('/' , CartController.getLoggedUserCart)
router.delete('/:itemId' , CartController.removeSpecificCartItem)
router.post('/' , CartController.clearCart)
router.put('/:itemId' , CartController.updateCartItemQuantity)
router.post('/applyCoupon', CartController.applyCoupon)

module.exports = router;