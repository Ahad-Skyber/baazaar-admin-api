const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const cat_ctrl = require('../controllers/category_ctrl');



router
    .post('/add_category',auth, cat_ctrl.add_category)
    .get('/category_list', auth,cat_ctrl.category_list)
    .post('/category_on_id',auth, cat_ctrl.category_on_id)
    .post('/update_category',auth,cat_ctrl.update_category)
    .post('/delete_category',auth, cat_ctrl.delete_category)
   
module.exports = router;