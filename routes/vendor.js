const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const vndr_ctrl = require('../controllers/vendor_ctrl');

router
    
    .get('/vendor_list',auth, vndr_ctrl.vendor_list)
    .post('/vendor_list_by_dates',auth, vndr_ctrl.vendor_list_by_dates)
    .post('/vendor_details',auth, vndr_ctrl.vendor_details)
    .post('/vendor_orders',auth, vndr_ctrl.vendor_orders)
    .post('/vendor_products',auth, vndr_ctrl.vendor_products)
    .post('/vendor_order_details',auth, vndr_ctrl.vendor_order_details)
    .post('/vendor_store_details',auth, vndr_ctrl.vendor_store_details)
    .post('/vendor_coupon_list',auth, vndr_ctrl.vendor_coupon_list)
    .post('/update_mps',auth, vndr_ctrl.update_mps)
   
module.exports = router;