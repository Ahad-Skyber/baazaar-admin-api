const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const child_cat_ctrl = require('../controllers/child_category_ctrl');



router
    .post('/add_child_category',auth, child_cat_ctrl.add_child_category)
    .get('/child_category_list',auth, child_cat_ctrl.child_category_list)
    .post('/child_category_on_id',auth, child_cat_ctrl.child_category_on_id)
    .post('/update_child_category',auth, child_cat_ctrl.update_child_category)
    .post('/delete_child_category',auth, child_cat_ctrl.delete_child_category)
   
module.exports = router;