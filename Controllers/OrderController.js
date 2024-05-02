const Order = require('../Models/Order')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
class OrderController{
  
static createOrder = asyncHandler(async (req, res, next) => {
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

module.exports={OrderController}