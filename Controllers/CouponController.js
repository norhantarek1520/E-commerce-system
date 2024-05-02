const Coupon = require('../Models/Coupon')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
class CouponController{
  
static createCoupon = asyncHandler(async (req, res, next) => {
      const { name, expire, discount } = req.body;    
      if (!name || !expire || !discount) {
        return res.status(400).json({ message: 'Missing required fields: name, expire, discount' });
      }
      try {
        // Convert expire to Date object (assuming ISO 8601 format)
        const expireDate = new Date(expire);
        const discountNumber = parseFloat(discount);
        // Create the coupon with converted values
        const coupon = await Coupon.create({ name, expire: expireDate, discount: discountNumber });
    
        res.status(201).json({ message: "coupon Created Succesfully ", data: coupon });
      } catch (error) {
        // Handle potential conversion errors
        console.error("Error creating coupon:", error);
        return next(new ApiError("Failed to create coupon" ,500))
  
      }
    });
    

static getAllCoupons = asyncHandler(async (req, res, next) => {
   const limit = parseInt(req.query.limit || 5, 10); // Ensure numeric limit
   const page = Math.max(1, parseInt(req.query.page || 1, 10)); // Handle negative or zero page
   const skip = (page - 1) * limit;
   const coupons = await Coupon.find().skip(skip).limit(limit);
   res.status(200).json({ result: coupons.length, page: page, list: coupons })
 
   })

static getCouponById = asyncHandler(async (req, res, next) => {
   const coupon = await Coupon.findById(req.params.id);
   if (coupon == null) { return next(new ApiError(`No coupon for this id : ${req.params.id}`, 404)) }
   res.status(200).json({ data: coupon })
   })

static updateCoupon = asyncHandler(async (req, res, next) => {
   const { name, expire, discount } = req.body;    
   if (!name || !expire || !discount) {
     return res.status(400).json({ message: 'Missing required fields: name, expire, discount' });
   }
     // Convert expire to Date object (assuming ISO 8601 format)
     const expireDate = new Date(expire);
     const discountNumber = parseFloat(discount);
     // Create the coupon with converted values
     const coupon = await Coupon.findOneAndUpdate(
      { name, expire: expireDate, discount: discountNumber } ,
      { new: true })
      if (!coupon) { return next(new ApiError(`No coupon for this id ${req.params.id}`, 404)); }
      res.status(201).json({ "message": "coupon Updated Succesfully ", data: coupon })

})

static deleteCoupon = asyncHandler(async (req, res, next) => {
   const coupon = await Coupon.findOneAndDelete({ _id: req.params.id })
   if (coupon == null) { return next(new ApiError(`No coupon for this id ${req.params.id}`, 404)); }
   res.status(204).json({ "message": "coupon deleted successfully " })

})
}

module.exports={CouponController}