const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must be belong to user'],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        productName : {
          type :String
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        price: Number,
      },
    ],
    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalOrderPrice: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      enum: ['card', 'cash'],
      default: 'cash',
    },
    dateOrdered : {
      type :Date , 
      default : Date.now 
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
   
  },
  { timestamps: true }
);


module.exports = mongoose.model('Order', orderSchema);
/**
Base Price: This is the initial price of the product before considering any taxes.
Tax Rate: This is a percentage or fixed amount set by the government or local authority that applies to the base price.
Tax Amount: This is calculated by multiplying the base price by the tax rate (e.g., taxAmount = basePrice * taxRate).
Final Price with Tax: This is the sum of the base price and the tax amount (e.g., finalPrice = basePrice + taxAmount).
Example:

Base price of a product: $100
Tax rate: 8%
Interpretation 1 (Tax Amount):

taxPrice would be $8 (calculated as 100 * 0.08).
Interpretation 2 (Final Price with Tax):

taxPrice would be $108 (calculated as 100 + 8)
 */
