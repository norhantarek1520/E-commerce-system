const express = require('express');
const router = express();
const { OrderController } = require('../Controllers/OrderController');
const { isAuthorized } = require('../Middlewares/isAuthorizedMiddleware')


router.post('/:id', isAuthorized, OrderController.createOrder);
router.put('/:id', isAuthorized,  OrderController.updateOrder)
router.delete('/:id', isAuthorized, OrderController.canceleOrder)
router.get('/:id', isAuthorized ,OrderController.getOrderByid)

router.get('/:id', isAuthorized ,OrderController.getUserOrderByid)
router.get('/:id', isAuthorized ,OrderController.getUserOrdersHistory)

router.get('/checkout-session/:cartId',OrderController.checkoutSession);
router.post('/:cartId', OrderController.createCashOrder);  
router.put('/:id/pay',OrderController.updateOrderToPaid);
router.put('/:id/deliver',OrderController.updateOrderToDelivered);


module.exports = router;