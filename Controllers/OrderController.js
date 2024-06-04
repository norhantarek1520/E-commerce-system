const Order = require('../Models/Order')
const asyncHandler = require('express-async-handler');
const { getUserId } = require('../Shared/SharedFunctions')
const ApiError = require('../Shared/ApiError');
// user
// taxPrice
// shippingAddress
// shippingPrice // will count  it 
// totalOrderPrice // will count it
// paymentMethodType 
// isPaid
// paidAt
// isDelivered
// cartItems: [
//     {
//       product: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'Product',
//       },
//       quantity: Number,
//       color: String,
//       price: Number,
//     },],

class OrderController {

    static createOrder = asyncHandler(async (req, res, next) => {
        // get user id 
        const authToken = req.headers.authorization?.split(' ')[1];
        const userId = getUserId(authToken);
        // count total shoping price 

        // count the total price (if there is coupon or descount)

        // payment way options 




        const newOrder = await Order.create({
            user: userId,
            shippingAddress: req.body.shippingAddress,
            isPaid: false,
            isDelivered: false
        })
    })

    static getUserOrdersHistory = asyncHandler(async (req, res, next) => {
    })

    static getUserOrderByid = asyncHandler(async (req, res, next) => {
    })

    static getOrderByid = asyncHandler(async (req, res, next) => {
    })

    static updateOrder = asyncHandler(async (req, res, next) => {
    })

    static canceleOrder = asyncHandler(async (req, res, next) => {
    })
    static checkoutSession = asyncHandler(async (req, res, next) => {
    })
    static createCashOrder = asyncHandler(async (req, res, next) => {
    })
    static updateOrderToPaid = asyncHandler(async (req, res, next) => {
    })
    static updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    })
}

module.exports = { OrderController }