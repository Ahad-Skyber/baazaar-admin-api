const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const variable_product_mod = require('../models/variable_product_mod');

const Customer_Mod = models.customer_mod;
const Order_Mod = models.order_mod;
const City_Mod = models.city_mod;
const Skyber_Id_Mod = models.skyber_id_mod;
const CustomerAddress_Mod = models.customer_address_mod;
const Waitlist_Mod = models.waitlist_mod;
const Vendor = models.user_mod;
const Order_Details_Mod = models.order_details_mod;
const Product_Mod = models.product_mod;
const Variable_Product_Mod = models.variable_product_mod;
const { Op } = require('sequelize');

// const Store = models.store;
// const Vendor = models.user_mod;
// const Product = models.product;

// const Category = models.category;
// const Waitlist = models.waitlist;
// const MasterUser = models.masterUser;



module.exports = {

    customer_list: (req, res, next) => {
      // if(!req.query.page)
      //   return res.status(400).send({ message: 'Page required!', data: null, err: null });
  
      // let limit = 10
      // let offset = 0 + (req.query.page - 1) * limit;
  
      Customer_Mod.findAll({
          where: { 
            status: 'active'
          },
          include: [{ model: City_Mod, as: 'city', attributes: ['name'] }],
          // offset: offset,
          // limit: limit,
          // order: [
          //     ['created_at', 'DESC']
          // ]
      }).then(async customers => {
  
        if(!customers ||customers.length == 0)
          return res.send(404).send({ message: 'Customers not found!', data: null, err: null });
  
          let response = [];
          // customers.map(async customer => {
          for(let customer of customers){
            const orders = await Order_Mod.count({ where: { customer_id: customer.id }});
            // const waitlist = await Waitlist.findOne({ where : { customer_id: customer.id }, attributes: ['rank']})
            
            const data = {
              id:customer.id,
              master_id:customer.master_user_id,
              customer_name: customer.customer_name,
              email: customer.email,
              location: customer.city == null ? 'NA' : customer.city.name,
              mobile_no: customer.mobile_number,
              order_placed: orders
              // waitlisted_ranking: waitlist == null ? 'NA' : waitlist.rank
            }
            console.log(data)
            response.push(data);
          }
          // })
  
          return res.status(200).json({
              message: "Customers!",
              data: response,
              err: null
          })
      })
      .catch(err => {
        console.log(err)
          return res.status(500).send({ message: 'Error!', data: null, err: err });
      })
    },



    customer_list_by_dates: (req, res, next) => {
      const startedDate = new Date(req.body.from_date);
      const endDate = new Date(req.body.to_date);
      // if(!req.query.page)
      //   return res.status(400).send({ message: 'Page required!', data: null, err: null });
  
      // let limit = 10
      // let offset = 0 + (req.query.page - 1) * limit;
  
      Customer_Mod.findAll({
          where: { 
            created_at: {[Op.between] : [startedDate , endDate ]}
          },
          include: [{ model: City_Mod, as: 'city', attributes: ['name'] }],
          // offset: offset,
          // limit: limit,
          // order: [
          //     ['created_at', 'DESC']
          // ]
      }).then(async customers => {
  
        if(!customers ||customers.length == 0)
          return res.send(404).send({ message: 'Customers not found!', data: null, err: null });
  
          let response = [];
          // customers.map(async customer => {
          for(let customer of customers){
            const orders = await Order_Mod.count({ where: { customer_id: customer.id }});
            // const waitlist = await Waitlist.findOne({ where : { customer_id: customer.id }, attributes: ['rank']})
            
            const data = {
              id:customer.id,
              master_id:customer.master_user_id,
              customer_name: customer.customer_name,
              email: customer.email,
              location: customer.city == null ? 'NA' : customer.city.name,
              mobile_no: customer.mobile_number,
              order_placed: orders
              // waitlisted_ranking: waitlist == null ? 'NA' : waitlist.rank
            }
            console.log(data)
            response.push(data);
          }
          // })
  
          return res.status(200).json({
              message: "Customers!",
              data: response,
              err: null
          })
      })
      .catch(err => {
        console.log(err)
          return res.status(500).send({ message: 'Error!', data: null, err: err });
      })
    },


    // customer_details: (req, res, next) => {

    //   const cust_id = req.body.id;
  
    //   Customer_Mod.findAll({ 
    //     where: { id: cust_id },
              

    //   })
    //   .then(async customer => {
    //       if (customer.length > 0) {
            
  
    //         res.status(200).send({ message: 'Customer details!', data: customer, err: null });

             
    //       } else {
    //         res.status(500).send({ message: 'Error whie geting customer details', data: null, err: null });

    //           }
    //   }).catch(err => {
       
    //       res.status(500).send({ message: err, data: null, err: err });
    //   })
    // },

    customer_details: (req, res, next) => {
      
      Customer_Mod.findAll({
        where: { 
          id: req.body.id
        },
        include: [{ model: City_Mod, as: 'city', attributes: ['name'] }],
         
      }).then(async customers => {
  
        if(customers.length == 0)
          return res.send(404).send({ message: 'Customers not found!', data: null, err: null });
  
          let response = [];
          let f_name="";
          let l_name="";
        
          for(let customer of customers){
            
            const orders = await Order_Mod.count({ where: { customer_id: customer.id }});
            const waitlist = await Waitlist_Mod.findOne({ where : { customer_id: customer.id }, attributes: ['used_referral_count']});
            const skyberids = await Skyber_Id_Mod.findOne({ where : { master_user_id: customer.master_user_id }, attributes: ['is_vendor']})
          



            var custFullName=customer.customer_name;
            var details=[]
            var details=custFullName.split(' ');
            f_name=details[0];
            l_name=details[1];

            const data = {
              id:customer.id,
              master_id:customer.master_user_id,
              customer_name: customer.customer_name,
              email: customer.email,
              location: customer.city == null ? 'NA' : customer.city.name,
              mobile_no: customer.mobile_number,
              order_placed: orders,
              used_referral_count: waitlist.used_referral_count,
              skyber_id:customer.skyberid_id,
              is_vendor:skyberids.is_vendor,
              first_name:f_name,
              last_name:l_name
            }
            console.log(data)
            response.push(data);
          }
  
          return res.status(200).json({
              message: "Customers!",
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

    // customer_orders: (req, res, next) => {
    //   //if(!req.query.page)
    //   //   return res.status(400).send({ message: 'Page required!', data: null, err: null });
  
    //   // let limit = Number(req.query.count);
    //   // let offset = 0 + (req.query.page - 1) * limit
      
    //   Order_Mod.findAll({
    //       where: {
    //         customer_id:req.params.id
    //       },
    //       //include: [{ model: Vendor, as: 'user', attributes: ['user_name'] }],
    //       //// attributes: [''],
    //       // offset: offset,
    //       // limit: limit,
    //       // order: [
    //       //     ['created_at', 'DESC']
    //       // ]
    //   }).then(async orders => {
  
    //       return res.status(200).json({
    //           message: "Customer Orders",
    //           data: orders,
    //           err: null
    //       })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //       return res.status(500).send({ message: err, data: null, err: err });
    //   })
    // },






    customer_orders: (req, res, next) => {

      const cust_id = req.body.id;
  
      Order_Mod.findAll({ 
        where: { customer_id: cust_id },
         include: [{ model: Vendor, as: 'user', attributes: ['user_name'] }],
          //// attributes: [''],
          //offset: offset,
          // limit: limit,
           order: [
              ['created_at', 'DESC']
          ]

      })
      .then(async order => {
          if (order.length > 0) {
            
            res.status(200).send({ message: 'Orders!', data: order, err: null });
             
          } else {
            res.status(500).send({ message: 'Error whie geting orders', data: null, err: null });

              }
      }).catch(err => {
       
          res.status(500).send({ message: err, data: null, err: err });
      })
    },


    order_details: (req, res, next) => {
      
      Order_Details_Mod.findAll({
        where: { 
          order_id: req.body.order_id
        }
            
      }).then(async details => {
  
        if(details.length == 0)
          return res.send(404).send({ message: 'Details not found!', data: null, err: null });
  
          let response = [];
          
          for(let detail of details){
            // const orders = await Order_Mod.count({ where: { customer_id: customer.id }});
            let prod="";
            let prod_img="";
            if(detail.product_id!=null)
            {
            prod = await Product_Mod.findOne({ where : { id:detail.product_id }, attributes: ['product_name']});
            prod_img = await Product_Mod.findOne({ where : { id:detail.product_id }, attributes: ['product_img_url']});

            }
            else if(detail.variable_product_id!=null)
            {
               const prodId = await Variable_Product_Mod.findOne({ where : { id:detail.variable_product_id }, attributes: ['product_id']});
               prod = await Product_Mod.findOne({ where : { id:prodId.product_id }, attributes: ['product_name']});
               prod_img = await Product_Mod.findOne({ where : { id:prodId.product_id }, attributes: ['product_img_url']});

            }
            const data = {
              id:detail.id,
              price:detail.price,
              qty:detail.qty,
              variation_ids: detail.variation_ids,
              created_at: detail.created_at,
              updated_at: detail.updated_at,
              order_id: detail.order_id,
              product_id: detail.product_id,
              variable_product_id: detail.variable_product_id,
              user_id: detail.user_id,
              customer_id: detail.customer_id,
              gst_amount: detail.gst_amount,
              product_name:prod.product_name,
              final_amount:(detail.price)*(detail.qty),
              prod_img:prod_img.product_img_url

              // location: customer.city == null ? 'NA' : customer.city.name,
              // order_placed: orders,
              // used_referral_count: waitlist.used_referral_count,
              // skyber_id:customer.skyberid_id,
              // is_vendor:skyberids.is_vendor
            }
            console.log(data)
            response.push(data);
          }
  
          return res.status(200).json({
              message: "Detailds!",
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
