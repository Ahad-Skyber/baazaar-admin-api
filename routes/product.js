const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const prod_ctrl = require('../controllers/product_ctrl');

router
    
    .get('/product_list',auth, prod_ctrl.product_list)
    // .post('/vendor_list_by_dates',auth, vndr_ctrl.vendor_list_by_dates)
    // .post('/vendor_details',auth, vndr_ctrl.vendor_details)
    // .post('/vendor_orders',auth, vndr_ctrl.vendor_orders)
    // .post('/vendor_products',auth, vndr_ctrl.vendor_products)
    // .post('/vendor_order_details',auth, vndr_ctrl.vendor_order_details)
    // .post('/vendor_store_details',auth, vndr_ctrl.vendor_store_details)
    // .post('/vendor_coupon_list',auth, vndr_ctrl.vendor_coupon_list)
   
module.exports = router;