const express = require('express');
const {WishlistController} = require('../Controllers/WishlistController')
const router = express.Router();

router.post('/' , WishlistController.addProductToWishlist)
router.get('/' , WishlistController.getUserWishlist);
router.delete('/:productId', WishlistController.removeProductFromWishlist);

module.exports = router;
 