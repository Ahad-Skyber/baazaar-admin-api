const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const u_type_ctrl = require('../controllers/unit_type_ctrl');



router
    .post('/add_unit_type',auth, u_type_ctrl.add_unit_type)
    .get('/unit_type_list',auth, u_type_ctrl.unit_type_list)
    .post('/unit_type_on_id',auth, u_type_ctrl.unit_type_on_id)
    .post('/update_unit_type',auth, u_type_ctrl.update_unit_type)
    .post('/delete_unit_type',auth, u_type_ctrl.delete_unit_type)
   
module.exports = router;