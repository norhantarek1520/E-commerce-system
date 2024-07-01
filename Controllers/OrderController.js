const Order = require('../Models/Order')
const asyncHandler = require('express-async-handler');
const { getUserId } = require('../Shared/SharedFunctions')
const ApiError = require('../Shared/ApiError');
const Cart = require('../Models/Cart')
const Product = require('../Models/Product')

const getCartItemsData = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return { cartItems: [], totalPrice: 0 }; // Handle empty cart
  }
  const cartItems = cart.cartItems.map((cartItem) => ({
    product: cartItem.product,
    productName: cartItem.productName,
    quantity: cartItem.quantity,
    color: cartItem.color,
    price: cartItem.price,
  }));
  const cartId = cart._id;
  const totalPrice = cart.totalCartPrice; // Use discounted price if available

  return { cartItems, totalPrice, cartId };
};
const createNewOrder = async (userId, shippingAddress, paymentMethodType) => {
  const { cartItems, totalPrice, cartId } = await getCartItemsData(userId);

  if (!cartItems.length) {
    throw new ApiError("There are no items in your cart", 400);
  }

  const shippingPrice = totalPrice
  const taxPrice = 50;
  const order = new Order({
    user: userId,
    // cartItems : cartId,
    cartItems,
    shippingAddress,
    shippingPrice,
    taxPrice: taxPrice,
    totalOrderPrice: shippingPrice + taxPrice,
    paymentMethodType,
  });

  await order.save();

  return order;
};

class OrderController {

  //===================================== Users ============================================

  static createOrder = asyncHandler(async (req, res, next) => {
    const userId = getUserId(req.headers.authorization?.split(' ')[1]);
    const shippingAddress = req.body.shippingAddress;
    const paymentMethodType = req.body.paymentMethodType;

    try {
      //  Make an order and save it to db 
      const order = await createNewOrder(userId, shippingAddress, paymentMethodType);
      // update the sate of the products in db 
      // clear the cart items of this user 

      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      next(new ApiError(`Error in order: ${error}`, 500));
    }
  });
  static getUserOrdersHistory = asyncHandler(async (req, res, next) => {
    const userId = getUserId(req.headers.authorization?.split(' ')[1]);
    const userHistory = await Order.find({ user: userId });
    if (userHistory != null || userHistory.length != 0)
      res.status(200).json({ "your orders : ": userHistory.length, "Your history is : ": userHistory })
    else return next(new ApiError("You has not Make any order yet ", 404))
  })
  static getUserOrderByid = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (order != null || order.length != 0) {
      // i will return taxPrice , shippingAddress,shippingPrice,totalOrderPrice  ,paymentMethodType 
      res.status(200).json({ "Your order is : ": order })
    }
    else return next(new ApiError("This Order id is not valid", 404))
  })

  
  static updateOrder = asyncHandler(async (req, res, next) => { })

  static canceleOrder = asyncHandler(async (req, res, next) => {
    // delete this order and update the status of the products in db 
  })
  //===================================== Admins =======================================================
  static getOrderByid = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (order != null || order.length != 0) {
      res.status(200).json({ "Your order is : ": order })
    }
    else return next(new ApiError("This Order id is not valid", 404))
  })
  static updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(  new ApiError( `There is no such a order with this id:${req.params.id}`, 404));
    }

    // update order to paid
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({ status: 'success', data: updatedOrder });
  });
  static updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next( new ApiError(`There is no such a order with this id:${req.params.id}`,404  ));
    }

    // update order to paid
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({ status: 'success', data: updatedOrder });
  });
  //=================================== System =========================================================

  static checkoutSession = asyncHandler(async (req, res, next) => {
  });
  static createCashOrder = asyncHandler(async (req, res, next) => {
  
  });
  

}

module.exports = { OrderController }