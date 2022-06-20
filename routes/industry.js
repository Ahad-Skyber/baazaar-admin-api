const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const indrs_ctrl = require('../controllers/industry_ctrl');



router
    .post('/add_industry',auth, indrs_ctrl.add_industry)
    .get('/industry_list',auth, indrs_ctrl.industry_list)
    .post('/industry_on_id',auth, indrs_ctrl.industry_on_id)
    .post('/update_industry',auth, indrs_ctrl.update_industry)
    .post('/delete_industry',auth, indrs_ctrl.delete_industry)
   
module.exports = router;