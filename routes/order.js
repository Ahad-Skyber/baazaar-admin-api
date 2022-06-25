const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ord_ctrl = require('../controllers/order_ctrl');

router
  
    .get('/order_list',auth, ord_ctrl.order_list)
    .post('/order_details',auth, ord_ctrl.order_details)
    .post('/order_items',auth, ord_ctrl.order_items)
    .post('/mark_delv',auth, ord_ctrl.mark_delv)
    // .post('/delete_brand',auth, ord_ctrl.delete_brand)
   
module.exports = router;
