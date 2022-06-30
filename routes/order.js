const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ord_ctrl = require('../controllers/order_ctrl');

router
  
    .get('/order_list',auth, ord_ctrl.order_list)
    .post('/order_details',auth, ord_ctrl.order_details)
    .post('/order_items',auth, ord_ctrl.order_items)
    .post('/mark_delv',auth, ord_ctrl.mark_delv)
    .post('/update_os',auth, ord_ctrl.update_os)
    .post('/order_list_by_dates',auth, ord_ctrl.order_list_by_dates)
   
module.exports = router;
