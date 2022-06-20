const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const sub_cat_ctrl = require('../controllers/sub_category_ctrl');



router
    .post('/add_sub_category',auth, sub_cat_ctrl.add_sub_category)
    .get('/sub_category_list',auth, sub_cat_ctrl.sub_category_list)
    .post('/sub_category_on_id',auth, sub_cat_ctrl.sub_category_on_id)
    .post('/update_sub_category',auth, sub_cat_ctrl.update_sub_category)
    .post('/delete_sub_category',auth, sub_cat_ctrl.delete_sub_category)
   
module.exports = router;