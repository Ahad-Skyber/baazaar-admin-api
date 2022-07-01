const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const sto_ctrl = require('../controllers/store_ctrl');

router
  
    .get('/store_list',auth, sto_ctrl.store_list)
    .post('/store_list_by_store_name',auth, sto_ctrl.store_list_by_store_name)
    // .post('/order_items',auth, sto_ctrl.order_items)
    // .post('/mark_delv',auth, sto_ctrl.mark_delv)
    // .post('/update_os',auth, sto_ctrl.update_os)
    // .post('/order_list_by_dates',auth, sto_ctrl.order_list_by_dates)
   
module.exports = router;
