const Cart = require('../Models/Cart')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
const { getUserId } = require("../Shared/SharedFunctions");
const Product = require('../Models/Product')
const User = require('../Models/User');
const calcTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
  };

class CartController {
    static getCart = asyncHandler(async (req, res, next) => {
        try {
            const userId =  getUserId(req.headers.authorization.split(' ')[1]) ;
            const cart = await Cart.find({ user: userId });
        if (!cart || cart.length === 0) {
          return res.status(404).json({ message: "The database is empty or this user does not have a cart." });
        }
        res.status(200).json(cart); 
      } catch (error) {
        console.error(error); // Log error for debugging
        return next(new ApiError("Internal server error: Failed to retrieve cart.", 500)); // Pass error to middleware for handling
      }
      
    })
    static addProductToCart = asyncHandler(async (req, res, next) => {
        const { product_id } = req.params;
        const quantity = req.body.quantity || 1; 
        const color = req.body.color;
        // if the product still in data base
        const product = await Product.findById(product_id);
        if (!product) { return res.status(404).json({ message: 'Product not found' }); }

        let userId = getUserId(req.headers.authorization.split(' ')[1])

        const cartData = await Cart.find({ user: userId })
        if (!cartData || cartData.length === 0) { // user doesnot has a cart
            try {
                const newCart = await Cart.create({
                user: userId,
                cartItems: {
                    product: product._id,
                    productName: product.title,
                    quantity,
                    color,
                    price: product.price,
                },
                totalCartPrice: product.price,
                totalPriceAfterDiscount: product.priceAfterDiscount,
                }, { new: true });
                if (!newCart) return next(new ApiError('Failed to add product and Create new cart', 404))
                else res.status(201).json({ "The new cart": newCart });
            } catch (error) { return next(new ApiError('Failed to create cart and add product to cart', 404))}
        } else { // user has a cart 
            //1. if the product exist in cart , update the quantity 
            const productIndex = cartData.cartItems.findIndex( (item) => item.product.toString() === product_id && item.color === color);
            if (productIndex > -1) {
                const cartItem = cartData.cartItems[productIndex];
                cartItem.quantity += 1;
                cartData.cartItems[productIndex] = cartItem;
            } else {
            // product not exist in cart,  push product to cartItems array
                    cartData.cartItems.push({ product: product_id, color, price: product.price });
            }

            calcTotalCartPrice(cartData);
            await cartData.save();

            res.status(200).json({ message: 'Product added to cart successfully', numOfCartItems: cartData.cartItems.length, data: cartData, });

        }


    })
    static removeSpecificCartItem = asyncHandler(async (req, res, next) => {
        const userId = getUserId(req.headers.authorization.split(' ')[1]);
        const cart = await Cart.find({ user: userId });
        
        if (cart.length === 0) {
        return new ApiError("This User has no Cart", 404);
        } else {
            const productToRemoveId = req.params.product_id;

            const updatedCart = await Cart.findOneAndUpdate(
            { user: userId, "cartItems.product": productToRemoveId },
            {  $pull: { cartItems: { product: productToRemoveId } },},
            {  new: true,}
            );
            calcTotalCartPrice(updatedCart);
            updatedCart.save();
        
            res.status(200).json({status: 'success',numOfCartItems: updatedCart.cartItems.length,data: updatedCart});
        
        if (updatedCart) {
            res.status(200).json({message: "Item deleted successfully!",updatedCart: updatedCart});
        } else {
            return new ApiError("Cart not found or item does not exist.", 404);
        }
        }
        

    })
    static clearCart = asyncHandler(async (req, res, next) => {
        const userId =  getUserId(req.headers.authorization.split(' ')[1]) ;
        const deletedCart = await Cart.findOneAndDelete({ user: userId }, { new: true });
        if (deletedCart) {
        res.status(204).json("Cart is cleared successfully!");
        } else {
        return new ApiError("Error clearing the cart. Cart not found or already empty.", 404);
        }
        
    })

  

}

module.exports = { CartController }