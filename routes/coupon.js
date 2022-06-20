const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const cou_ctrl = require('../controllers/coupon_ctrl');



router
    .post('/add_coupon',auth, cou_ctrl.add_coupon)
    .get('/coupon_list',auth, cou_ctrl.coupon_list)
    .post('/coupon_on_id',auth, cou_ctrl.coupon_on_id)
    .post('/update_coupon',auth, cou_ctrl.update_coupon)
    .post('/delete_coupon',auth, cou_ctrl.delete_coupon)
   
module.exports = router;