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

const Customer_Address_Mod=models.customer_address_mod;


const { Op } = require('sequelize');
const master_user_mod = require('../models/master_user_mod');


var sequelize = require("sequelize");
const customer_address_mod = require('../models/customer_address_mod');



module.exports = {


      order_list: (req, res, next) => {  
        Order_Mod.findAll({
           limit: 100 ,
           order: [
            ['id', 'DESC']
       ]
        }).then(async orders => {
          if(!orders ||orders.length == 0)
            return res.send(404).send({ message: 'Orders not found!', data: null, err: null });
            let response = [];    
            for(let order of orders){   

              const sto_name = await Store_Mod.findOne({ where : {user_id: order.user_id }, attributes: ['store_name']})
              const cust_name = await Customer_Mod.findOne({ where : {id: order.customer_id }, attributes: ['customer_name']})
              const items = await Order_Details_Mod.count({ where: {order_id: order.id }});

              const usr_name = await User_Mod.findOne({ where : {id: order.user_id }, attributes: ['user_name']})


              const data = {
                id:order.id,
                order_no: order.order_id,

                store_name:sto_name.store_name,
                customer_name:cust_name.customer_name,
                order_place_on: order.order_date == null ? 'NA' : moment(order.order_date).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),

                order_status: order.order_status,
                delivery: order.delivery_mode,
                payment_status: order.payment_method,
                order_value:order.total_mrp,
                items:items,  
                user_name:usr_name.user_name

              }
             
              response.push(data);
            }
    
            return res.status(200).json({
                message: "Orders!",
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


      order_details: (req, res, next) => {   
        Order_Mod.findOne({
          where: { 
            id: req.body.id
          }
             
        }).then(async order_detail => {
    
          if(!order_detail ||order_detail.length == 0)

            return res.send(404).send({ message: 'Order detail not found!', data: null, err: null });
    
             let response = [];
             let vend_let="";
             let vend_long="";
             let cust_lat="";
             let cust_long="";
             
           
            const Cust_name = await Customer_Mod.findOne({ where : {id: order_detail.customer_id }, attributes: ['customer_name']})
            const Cust_mobile = await Customer_Mod.findOne({ where : {id: order_detail.customer_id }, attributes: ['mobile_number']})


            const Vend_mobile = await User_Mod.findOne({ where : {id: order_detail.user_id }, attributes: ['contact_no']})



            const sto_name = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['store_name']})
            const sto_address = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['store_address']})
            const sto_landmark = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['landmark']})
            const sto_city = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['city']})
            const sto_state = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['state']})
            const sto_country = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['country']})
            const sto_postal_code = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['postal_code']})

            const sto_latitude = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['latitude']})
            const sto_longitude = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['longitude']})

            const ord_customer_address_id = await Order_Mod.findOne({ where : {id: req.body.id }, attributes: ['customer_address_id']})

            const cust_house_flat_block_no = await Customer_Address_Mod.findOne({ where : {id: ord_customer_address_id.customer_address_id }, attributes: ['house_flat_block_no']})
            const cust_landmark = await Customer_Address_Mod.findOne({ where : {id: ord_customer_address_id.customer_address_id }, attributes: ['landmark']})

            const cust_latitude = await Customer_Address_Mod.findOne({ where : {id: ord_customer_address_id.customer_address_id }, attributes: ['latitude']})
            const cust_longitude = await Customer_Address_Mod.findOne({ where : {id: ord_customer_address_id.customer_address_id }, attributes: ['longitude']})


            const vndr_otp = await Order_Details_Mod.findOne({ where : {order_id: req.body.id }, attributes: ['product_id']})



if(sto_latitude!==null)
{
  vend_let=sto_latitude.latitude
}
else
{
  vend_let="NA"
}
if(sto_longitude!==null)
{
  vend_long=sto_longitude.longitude
}
else
{
  vend_long="NA"
}


if(cust_latitude!==null)
{
  cust_lat=cust_latitude.latitude
}
else
{
  cust_lat="NA"
}
if(cust_longitude!==null)
{
  cust_long=cust_longitude.longitude
}
else
{
  cust_long="NA"
}


            const firstCharacter = order_detail.order_id.charAt(12);
            const secondCharacter = order_detail.order_id.charAt(13);
            const thirdCharacter = order_detail.order_id.charAt(14);
            const fourthCharacter = order_detail.order_id.charAt(15);


              const data = {
                id:order_detail.id,
                order_id:order_detail.order_id,

                order_status:order_detail.order_status,
                delivery_mode:order_detail.delivery_mode,

                


                vendor_mobile:Vend_mobile == null ? 'N/A' : Vend_mobile.contact_no == null ? 'N/A' : Vend_mobile.contact_no,
 
                store_name: sto_name.store_name == null ? 'N/A' : sto_name.store_name,
                store_address:sto_address == null ? 'N/A' : sto_address.store_address == null ? 'N/A' : sto_address.store_address,

                store_landmark: sto_landmark.landmark == null ? 'N/A' : sto_landmark.landmark,
                store_city: sto_city.city == null ? 'N/A' : sto_city.city,
                store_state: sto_state.state == null ? 'N/A' : sto_state.state,
                store_country: sto_country.country == null ? 'N/A' : sto_country.country,
                store_postal_code: sto_postal_code.postal_code == null ? 'N/A' : sto_postal_code.postal_code,
   
                store_geo_location_address:"https://maps.google.com/?q="+vend_let+","+vend_long,
    
                order_date: order_detail.order_date == null ? 'N/A' : moment(order_detail.order_date).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),
                order_confirm_date: order_detail.order_confirm_date == null ? 'N/A' : moment(order_detail.order_confirm_date).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),
                order_delivered_date: order_detail.order_delivered_date == null ? 'N/A' : moment(order_detail.order_delivered_date).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),

                note: order_detail.note == null ? 'N/A' : order_detail.note,

                customer_name:Cust_name.customer_name,
                customer_mobile:Cust_mobile.mobile_number,

                customer_house_flat_block_no: cust_house_flat_block_no == null ? 'N/A' :cust_house_flat_block_no.house_flat_block_no == null ? 'N/A' : cust_house_flat_block_no.house_flat_block_no,
                customer_landmark: cust_landmark == null ? 'N/A' :cust_landmark.landmark == null ? 'N/A' : cust_landmark.landmark,     
                customer_geo_location_address:"https://maps.google.com/?q="+cust_lat+","+cust_long,

                payment_method:order_detail.payment_method,
                collecting_date: order_detail.collecting_date == null ? 'N/A' : moment(order_detail.collecting_date).format("DD-MM-YYYY"),
                collecting_time: order_detail.collecting_time == null ? 'N/A' : order_detail.collecting_time,

                total_mrp: order_detail.total_mrp == null ? 'NA' : order_detail.total_mrp,
                discount_amount: order_detail.discount_amount == null ? 'NA' : order_detail.discount_amount,
                total_price: order_detail.total_price == null ? 'NA' : order_detail.total_price,
                shipping_charge: order_detail.shipping_charge == null ? 'NA' : order_detail.shipping_charge,
                total_gst_amount: order_detail.total_gst_amount == null ? 'NA' : order_detail.total_gst_amount,
                coupon_amount: order_detail.coupon_amount == null ? 'NA' : order_detail.coupon_amount,
                final_amount: order_detail.final_amount == null ? 'NA' : order_detail.final_amount,

                vendor_otp:firstCharacter+secondCharacter+thirdCharacter+fourthCharacter,
                // customer_otp:thirdCharacter+firstCharacter+fourthCharacter+secondCharacter

                customer_otp:vndr_otp.product_id

            
               
                   
              }
              response.push(data); 

              return res.status(200).json({
                message: "order_detail!",
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




      order_items: (req, res, next) => {
      
        Order_Details_Mod.findAll({
          where: { 
            order_id: req.body.order_id
          }
              
        }).then(async details => {
    
          if(details.length == 0)
            return res.send(404).send({ message: 'Details not found!', data: null, err: null });
    
            let response = [];
            
            for(let detail of details){
              
              prod = await Product_Mod.findOne({ where : { id:detail.product_id }, attributes: ['product_name']});
              prod_img = await Product_Mod.findOne({ where : { id:detail.product_id }, attributes: ['product_img_url']});
   
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
                prod_img:prod_img.product_img_url,
                s_price:(detail.price)/(detail.qty)
     
              }
              console.log(data)
              response.push(data);
            }
    
            return res.status(200).json({
                message: "Details!",
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



      mark_delv: (req, res, next) => {
        Order_Mod.findOne({
          where: {
            id: req.body.order_id,
            order_status:"Accepted"
            
        }
      }
      )
        .then(ord => {
          if(ord){
    
            Order_Mod.update({ 
              order_status:"Delivered",
              order_delivered_date:new Date(),

              },
                { 
                where: {id: req.body.order_id, } 
              })
          
            .then(updated_ord => {	
              if(updated_ord){	
                res.status(200).send({ message: 'Status updated successfully!', data:null, err: null });
              }
              else{
                res.status(500).send({ message: 'Error while updating status', data: null, err: null });
              }
            
            }).catch(err => {
              console.log(err)
            })

          }
          else{	
          
            res.status(201).send({ message: 'Sorry order is not accepted.', data:null, err: null });
               
          }
        }).catch(err => {
          console.log(err)
    
    
        })
    
      },

        update_os: (req, res, next) => {
        
        if(req.body.password=="override")
          {

          if(req.body.order_status=="Accepted")
          {
              //Accepted start
              Order_Mod.update({ 
                order_status:req.body.order_status,
                order_confirm_date:new Date()
                },
                  { 
                  where: { id: req.body.id } 
                })
              .then(updated_os => {	
                if(updated_os){	
                  res.status(200).send({ message: 'Status updated successfully!', data:null, err: null });
                }
                else{
                  res.status(500).send({ message: 'Error while updating status', data: null, err: null });
                }
              
              }).catch(err => {
                console.log(err)
              })   
              //Accepted  end
          }
          else  if(req.body.order_status=="Rejected")
          {
              //Rejected start
              Order_Mod.update({ 
                order_status:req.body.order_status,
                order_reject_date:new Date()
                },
                  { 
                  where: { id: req.body.id } 
                })
              .then(updated_os => {	
                if(updated_os){	
                  res.status(200).send({ message: 'Status updated successfully!', data:null, err: null });
                }
                else{
                  res.status(500).send({ message: 'Error while updating status', data: null, err: null });
                }
              
              }).catch(err => {
                console.log(err)
              })
              //Rejected  end
          }
          else  if(req.body.order_status=="Delivered")
          {
              //Delivered start
              Order_Mod.update({ 
                order_status:req.body.order_status,
                order_delivered_date:new Date()
                },
                  { 
                  where: { id: req.body.id } 
                })
              .then(updated_os => {	
                if(updated_os){	
                  res.status(200).send({ message: 'Status updated successfully!', data:null, err: null });
                }
                else{
                  res.status(500).send({ message: 'Error while updating status', data: null, err: null });
                }
              
              }).catch(err => {
                console.log(err)
              })
              //Delivered  end
          }
          else  
          {
              //Other start
              Order_Mod.update({ 
                order_status:req.body.order_status
                },
                  { 
                  where: { id: req.body.id } 
                })
              .then(updated_os => {	
                if(updated_os){	
                  res.status(200).send({ message: 'Status updated successfully!', data:null, err: null });
                }
                else{
                  res.status(500).send({ message: 'Error while updating status', data: null, err: null });
                }
              
              }).catch(err => {
                console.log(err)
              })
              //Other  end
          }


        }
        else
        {	
          
          res.status(201).send({ message: 'Sorry password does not match.', data:null, err: null });
             
        }


   
      },


      order_list_by_dates_status: (req, res, next) => {  
        const startedDate = new Date(req.body.from_date);
        const endDate = new Date(req.body.to_date);

        if(req.body.status=="All")
        {

          Order_Mod.findAll({
            where: { 
              user_id:req.body.user_id,
              order_date: {[Op.between] : [new Date(startedDate), new Date(endDate) ]},     
             },
            
             order: [
              ['id', 'DESC']
         ]
          }).then(async orders => {
            if(!orders ||orders.length == 0)
              return res.send(404).send({ message: 'Orders not found!', data: null, err: null });
              let response = [];    
              for(let order of orders){   
  
                const sto_name = await Store_Mod.findOne({ where : {user_id: order.user_id }, attributes: ['store_name']})
                const cust_name = await Customer_Mod.findOne({ where : {id: order.customer_id }, attributes: ['customer_name']})
                const items = await Order_Details_Mod.count({ where: {order_id: order.id }});
  
                const usr_name = await User_Mod.findOne({ where : {id: order.user_id }, attributes: ['user_name']})
  
  
                const data = {
                  id:order.id,
                  order_no: order.order_id,
  
                  store_name:sto_name.store_name,
                  customer_name:cust_name.customer_name,
                  order_place_on: order.order_date == null ? 'NA' : moment(order.order_date).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),
  
                  order_status: order.order_status,
                  delivery: order.delivery_mode,
                  payment_status: order.payment_method,
                  order_value:order.total_mrp,
                  final_amount: order.final_amount == null ? 'NA' : order.final_amount,
                  items:items,  
                  user_name:usr_name.user_name
  
                }
               
                response.push(data);
              }
      
              return res.status(200).json({
                  message: "Orders!",
                  data: response,
                  err: null
              })
          })
          .catch(err => {
            console.log(err)
              return res.status(500).send({ message: 'Error!', data: null, err: err });
             
          })

        }
        else{

          Order_Mod.findAll({
            where: { 
              user_id:req.body.user_id,
              order_date: {[Op.between] : [new Date(startedDate), new Date(endDate) ]}, 
              order_status:req.body.status
             },
            
             order: [
              ['id', 'DESC']
         ]
          }).then(async orders => {
            if(!orders ||orders.length == 0)
              return res.send(404).send({ message: 'Orders not found!', data: null, err: null });
              let response = [];    
              for(let order of orders){   
  
                const sto_name = await Store_Mod.findOne({ where : {user_id: order.user_id }, attributes: ['store_name']})
                const cust_name = await Customer_Mod.findOne({ where : {id: order.customer_id }, attributes: ['customer_name']})
                const items = await Order_Details_Mod.count({ where: {order_id: order.id }});
  
                const usr_name = await User_Mod.findOne({ where : {id: order.user_id }, attributes: ['user_name']})
  
  
                const data = {
                  id:order.id,
                  order_no: order.order_id,
  
                  store_name:sto_name.store_name,
                  customer_name:cust_name.customer_name,
                  order_place_on: order.order_date == null ? 'NA' : moment(order.order_date).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),
  
                  order_status: order.order_status,
                  delivery: order.delivery_mode,
                  payment_status: order.payment_method,
                  order_value:order.total_mrp,

                  final_amount: order.final_amount == null ? 'NA' : order.final_amount,

                  items:items,  
                  user_name:usr_name.user_name
  
                }
               
                response.push(data);
              }
      
              return res.status(200).json({
                  message: "Orders!",
                  data: response,
                  err: null
              })
          })
          .catch(err => {
            console.log(err)
              return res.status(500).send({ message: 'Error!', data: null, err: err });
              
          })


        }



       






      },






}
