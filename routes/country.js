const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const count_ctrl = require('../controllers/country_ctrl');



router
    .post('/add_country',auth, count_ctrl.add_country)
    .get('/country_list',auth, count_ctrl.country_list)
    .post('/country_on_id',auth, count_ctrl.country_on_id)
    .post('/update_country',auth, count_ctrl.update_country)
    .post('/delete_country',auth, count_ctrl.delete_country)
   
module.exports = router;