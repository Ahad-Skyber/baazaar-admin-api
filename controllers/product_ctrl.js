const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');

const moment = require('moment');

const Master_User_Mod = models.master_user_mod;
const User_Mod = models.user_mod;
const Store_Mod = models.store_mod;
const Kyc_Mod = models.kyc_mod;
const Industry_Mod = models.industry_mod;
const Product_Mod = models.product_mod;
const Order_Mod = models.order_mod;
const Child_Category_Mod=models.child_category_mod;
const Variable_Product_Mod = models.variable_product_mod;
const Order_Details_Mod=models.order_details_mod;
const Customer_Mod=models.customer_mod;
const Social_Media_Mod=models.social_media_mod
const Coupon_Mod=models.coupon_mod


const { Op } = require('sequelize');
const master_user_mod = require('../models/master_user_mod');


var sequelize = require("sequelize");



module.exports = {

      product_list: (req, res, next) => {  
        Product_Mod.findAll({
        //   where: { 
        //     user_id: req.body.id
        //   },
          order: [
            ['id', 'DESC']
        ]
        }).then(async products => {
          if(!products ||products.length == 0)
            return res.send(404).send({ message: 'Products not found!', data: null, err: null });

            let response = [];   
            let s_price="";

            for(let product of products){ 

               const child_cat = await Child_Category_Mod.findOne({ where : {id: product.child_category_id }, attributes: ['childcategory_name']})
               
                const n_o_p_s = await Order_Details_Mod.count({ where: { product_id: product.id }});


              const data = {
                id:product.id,
                product_name: product.product_name,
                child_category:child_cat.childcategory_name,
                product_type:product.product_type,
                selling_price:product.selling_price,
                purchase:n_o_p_s,
                product_img_url:product.product_img_url
               
              }
             
              response.push(data);
            }
    
            return res.status(200).json({
                message: "Products!",
                data: response,
                err: null
            })
        })
        .catch(err => {
          console.log(err)
            return res.sta
            tus(500).send({ message: 'Error!', data: null, err: err });
        })
      },

}
