const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const brnd_ctrl = require('../controllers/brand_ctrl');

router
    .post('/add_brand',auth, brnd_ctrl.add_brand)
    .get('/brand_list',auth, brnd_ctrl.brand_list)
    .post('/brand_on_id',auth, brnd_ctrl.brand_on_id)
    .post('/update_brand',auth, brnd_ctrl.update_brand)
    .post('/delete_brand',auth, brnd_ctrl.delete_brand)
   
module.exports = router;