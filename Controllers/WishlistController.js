const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
class WishlistController{


static getUserWishlist = asyncHandler(async(req , res , next)=>{})
static removeProductFromWishlist = asyncHandler(async(req , res , next)=>{})
static addProductToWishlist = asyncHandler(async(req , res , next)=>{})
static cleareWishlist = asyncHandler(async(req , res , next)=>{})

}
module.exports={WishlistController}