const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const comp_det_ctrl = require('../controllers/company_details_ctrl');
const upload = require("../middlewares/upload");

router
    
    .get('/company_details_list',auth, comp_det_ctrl.company_details_list)
    .post('/company_coupon_list',auth, comp_det_ctrl.company_coupon_list)
    .post("/upload",auth, upload.single("file"), comp_det_ctrl.upload)
    //.post("/upload",auth,  comp_det_ctrl.upload)
    // .post('/update_brand',auth, comp_det_ctrl.update_brand)
    // .post('/delete_brand',auth, comp_det_ctrl.delete_brand)
   
module.exports = router;