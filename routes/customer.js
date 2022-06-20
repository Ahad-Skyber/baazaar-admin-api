const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const cust_ctrl = require('../controllers/customer_ctrl');
router
    
    .get('/customer_list',auth, cust_ctrl.customer_list)
    .post('/customer_list_by_dates',auth, cust_ctrl.customer_list_by_dates)
    .post('/customer_details',auth, cust_ctrl.customer_details)
    .post('/customer_orders',auth, cust_ctrl.customer_orders)
    .post('/order_details',auth, cust_ctrl.order_details)
   
module.exports = router;