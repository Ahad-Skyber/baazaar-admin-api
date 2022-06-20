const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const cat_type_ctrl = require('../controllers/category_type_ctrl');



router
    .post('/add_category_type',auth, cat_type_ctrl.add_category_type)
    .get('/category_type_list', auth,cat_type_ctrl.category_type_list)
    .post('/category_type_on_id',auth, cat_type_ctrl.category_type_on_id)
     .post('/update_category_type',auth, cat_type_ctrl.update_category_type)
    .post('/delete_category_type',auth, cat_type_ctrl.delete_category_type)
   
module.exports = router;