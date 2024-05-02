const express = require('express');
const router = express();
const {CouponController} = require('../Controllers/CouponController')
const  {isAdmin} = require('../Middlewares/isAdminMiddleware')


router.post('/' ,CouponController.createCoupon )
router.get('/' ,CouponController.getAllCoupons)
router.get('/:id' ,CouponController.getCouponById)
router.put('/:id'   ,CouponController.updateCoupon)
router.delete('/:id'  ,CouponController.deleteCoupon)
  

module.exports = router;