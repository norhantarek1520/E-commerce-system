// ================== all requierd packages ====================
const cors = require("cors");
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const dotenv = require('dotenv')
const morgan = require('morgan');
const  ApiError = require('./Shared/ApiError');
const globalError = require('./middlewares/errorMiddleware');
//========================= INITIALIZE EXPRESS APP ================
const express = require('express');
let app = express();
// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());

app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 
dotenv.config(); 

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    // console.log(`mode: ${process.env.NODE_ENV}`);
}
  
//============================ Connect DB ==================================
const DbConnection = require('./DbConnection/db')
DbConnection() ;
//==================== Requierd Routers ====================================
app.use('/', require('./Routers/AuthRouters'))
app.use('/address', require('./Routers/AddressRoute'))
app.use('/cart', require('./Routers/CartRouters'))
app.use('/category', require('./Routers/CategoryRouters'))
app.use('/coupon', require('./Routers/CouponRouters'))
app.use('/order', require('./Routers/OrderRouters'))
app.use('/product', require('./Routers/ProductRouters'))
app.use('/review', require('./Routers/ReviewRouters'))
app.use('/sub_category', require('./Routers/SubCategoryRouters'))
app.use('/user', require('./Routers/UserRouters'))
app.use('/wishlist', require('./Routers/WishlistRoute'))



app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400)); // Use new keyword
});
// Global error handling middleware for express
app.use(globalError);

const server = app.listen(process.env.PORT || 8000 , ()=>{console.log(`The server is connected in port ${process.env.PORT}`)})

// unhandled Rejections ( any error outside express )
process.on('unhandledRejection' , (err)=>{
    console.error(`This error is error outside express ${err}` )
    server.close(()=>{  //shutdown this server first  
        console.log("shutdown this application ... !")
        process.exit(1) ; 
    })
})
