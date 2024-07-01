const getCartItemsData = async () => {
  const cart = {
    _id: new ObjectId('667541d243121936e866bfd9'),
    cartItems: [
      {
        product: new ObjectId('667522bbc32e204058c72159'),
        productName: 'Classic Crew Neck T-Shirt',
        quantity: 1,
        color: 'white',
        price: 24.99,
        _id: new ObjectId('667541d243121936e866bfda')
      }
    ],
    totalCartPrice: 24.99,
    user: new ObjectId('6673cc215c885c88a53d3513'),
    __v: 0
  }

  console.log("getCartItemsData function : \n" + cart)
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
function data() {
  const data = {
    "shippingAddress": {
      "details": "123 Main Street, Apt. 201",
      "more": ["phone1" , "phone2" , ["phone12" , "phone22"] , {"name" :"nourhan" , "age" : [21,22]}],
      "city": "New York",
      "postalCode": "10001"
    },
    "_id": "667670b7f5796e4637a70658",
    "user": "6673cc215c885c88a53d3513",

  };
  // ============== to handle object has an object has an array has an object ==============================
  // console.log(data.shippingAddress.details)
   //console.log(data.shippingAddress.more) // it will return the array more
  // console.log(data.shippingAddress.more[2][1]) // phone22
  // console.log(data.shippingAddress.more[3]) // { name: 'nourhan', age: [ 21, 22 ] }
  //console.log(data.shippingAddress.more[3].name)  // nourhan
  // console.log(data.shippingAddress.more[3].age) // [ 21, 22 ]
  // console.log(data.shippingAddress.more[3].age[1]) // 22

  const data2 = [
    1, 2,{  "shippingAddress": {
      "details": "123 Main Street, Apt. 201",
      "more": ["phone1" , "phone2" , ["phone12" , "phone22"] , {"name" :"nourhan" , "age" : [21,22]}],
      "city": "New York",
      "postalCode": "10001"
    },}
  ]
  // console.log(data2[2])
  console.log(data2[2].shippingAddress.more[3].name)

}

data()