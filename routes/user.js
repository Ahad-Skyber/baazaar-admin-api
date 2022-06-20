const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const usr_ctrl = require('../controllers/user_ctrl');


router
    
    .get('/user_list',auth, usr_ctrl.user_list)
    .post('/user_list_by_dates', auth,usr_ctrl.user_list_by_dates)
    // .post('/brand_on_id', usr_ctrl.brand_on_id)
    // .post('/update_brand', usr_ctrl.update_brand)
    // .post('/delete_brand', usr_ctrl.delete_brand)
   
module.exports = router;