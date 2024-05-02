const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
class AddressController{


static getLoggedUserAddresses = asyncHandler(async(req , res , next)=>{})
static removeAddress = asyncHandler(async(req , res , next)=>{})
static addAddress = asyncHandler(async(req , res , next)=>{})
static updateAddress = asyncHandler(async(req , res , next)=>{})

}
module.exports={AddressController}