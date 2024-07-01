const express = require('express');
const router = express();
const { OrderController } = require('../Controllers/OrderController');
const { isAuthorized } = require('../Middlewares/isAuthorizedMiddleware')
const {isAdmin} = require('../Middlewares/isAdminMiddleware')


router.post('/', isAuthorized, OrderController.createOrder);
router.put('/:id', isAuthorized,  OrderController.updateOrder)
router.delete('/:id', isAuthorized, OrderController.canceleOrder)

router.get('/:id', isAuthorized ,OrderController.getUserOrderByid)
router.get('/', isAuthorized ,OrderController.getUserOrdersHistory)

router.get('/checkout-session/:cartId',OrderController.checkoutSession);
router.post('/cash-order/:cartId', OrderController.createCashOrder);  

router.get('/admin/:id', isAdmin ,OrderController.getOrderByid)
router.put('/admin/pay/:id', isAdmin,OrderController.updateOrderToPaid);
router.put('/admin/deliver/:id', isAdmin,OrderController.updateOrderToDelivered);


module.exports = router;