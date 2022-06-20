const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adm_ctrl = require('../controllers/admin_ctrl');

router
    .post('/admin_login', adm_ctrl.admin_login)
    .post('/add_admin',auth, adm_ctrl.add_admin)
    .get('/admin_list',auth, adm_ctrl.admin_list)
    .post('/admin_on_id',auth, adm_ctrl.admin_on_id)
    .post('/change_password',auth, adm_ctrl.change_password)
    .post('/update_admin',auth, adm_ctrl.update_admin)
    .post('/delete_admin',auth, adm_ctrl.delete_admin)
   
module.exports = router;