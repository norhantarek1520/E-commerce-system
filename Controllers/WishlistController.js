const asyncHandler = require('express-async-handler');
const User = require('../Models/User')
const { getUserId } = require("../Shared/SharedFunctions");
class WishlistController {

    static addProductToWishlist = asyncHandler(async (req, res, next) => {
        const userId = getUserId(req.headers.authorization.split(' ')[1])
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { wishlist: req.body.productId },
            },
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'Product added successfully to your wishlist.',
            data: user.wishlist,
        });
    });

    static removeProductFromWishlist = asyncHandler(async (req, res, next) => {
        const userId = getUserId(req.headers.authorization.split(' ')[1])
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { wishlist: req.params.productId },
            },
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'Product removed successfully from your wishlist.',
            data: user.wishlist,
        });
    });

    static getUserWishlist = asyncHandler(async (req, res, next) => {
        const userId = getUserId(req.headers.authorization.split(' ')[1])
        const user = await User.findById(userId);

        res.status(200).json({
            status: 'success',
            results: user.wishlist.length,
            data: user.wishlist,
        });
    });


}
module.exports = { WishlistController }