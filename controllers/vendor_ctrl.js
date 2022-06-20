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


    vendor_list: (req, res, next) => {
      // if(!req.query.page)
      //   return res.status(400).send({ message: 'Page required!', data: null, err: null });
  
      // let limit = 10
      // let offset = 0 + (req.query.page - 1) * limit;
  
      User_Mod.findAll({
        //   where: { 
        //     status: 'active'
        //   },
        //   include: [{ model: City_Mod, as: 'city', attributes: ['name'] }],
          // offset: offset,
          // limit: limit,
          order: [
              ['id', 'DESC']
          ]
      }).then(async users => {
  
        if(!users ||users.length == 0)
          return res.send(404).send({ message: 'Vendors not found!', data: null, err: null });
  
          let response = [];
          let i_m_p ="";
          let is_created=""
            
          for(let user of users){

            const vndr_name = await Master_User_Mod.findOne({ where : { id: user.master_user_id }, attributes: ['full_name']});
            const is_created_count = await Product_Mod.count({ where: { user_id: user.id }});
            const location = await Store_Mod.findOne({ where : { user_id: user.id }, attributes: ['district']});
           
            if(user.is_bazar_marketplace===true)
            {
              i_m_p="Yes"
            }
            else
            {
              i_m_p="No"
            }

            if(is_created_count===0)
            {
              is_created="No"
              
            }
            else
            {
              is_created="Yes"
            }

            const data = {
              id:user.id,

              vendor_name: vndr_name == null ? 'NA' : vndr_name.full_name,

              user_name:user.user_name,
              contact_no: user.contact_no,
              status: user.status,
              last_login: user.last_login,    
              is_bazar_marketplace: user.is_bazar_marketplace,
              is_marketplace:i_m_p ,   

              location: location == null ? 'NA' : location.district,

              is_created: is_created,

              store_link:'baazaar.io/'+user.user_name
              
            }
            console.log(data)
            response.push(data);
          }
          // })
  
          return res.status(200).json({
              message: "Vendors!",
              data: response,
              err: null
          })
      })
      .catch(err => {
        console.log(err)
          return res.status(500).send({ message: 'Error!', data: null, err: err });
      })
    },

    vendor_list_by_dates: (req, res, next) => {

        const startedDate = new Date(req.body.from_date);
        const endDate = new Date(req.body.to_date);

        // if(!req.query.page)
        //   return res.status(400).send({ message: 'Page required!', data: null, err: null });
    
        // let limit = 10
        // let offset = 0 + (req.query.page - 1) * limit;
    
        User_Mod.findAll({
            where: { 
             created_at: {[Op.between] : [startedDate , endDate ]}
              
            },
          //   include: [{ model: City_Mod, as: 'city', attributes: ['name'] }],
            // offset: offset,
            // limit: limit,
            order: [
                ['id', 'DESC']
            ]
        }).then(async users => {
    
          if(!users ||users.length == 0)
            return res.send(404).send({ message: 'Vendors not found!', data: null, err: null });
    
            let response = [];
            let i_m_p ="";
            let is_created="";
            
           
          
            for(let user of users){
  
              const vndr_name = await Master_User_Mod.findOne({ where : { id: user.id }, attributes: ['full_name']});
              const is_created_count = await Store_Mod.count({ where: { user_id: user.id }});
              const location = await Store_Mod.findOne({ where : { user_id: user.id }, attributes: ['district']});
             
              if(user.is_bazar_marketplace===true)
              {
                i_m_p="Yes"
              }
              else
              {
                i_m_p="No"
              }

              if(is_created_count===0)
              {
                is_created="No"
                
              }
              else
              {
                is_created="Yes"
              }


  
              const data = {
                id:user.id,
  
                vendor_name: vndr_name == null ? 'NA' : vndr_name.full_name,
  
                user_name:user.user_name,
                contact_no: user.contact_no,
                status: user.status,
                last_login: user.last_login,    
                is_bazar_marketplace: user.is_bazar_marketplace,
                is_marketplace:i_m_p ,   
  
                location: location == null ? 'NA' : location.district,
  
                is_created: is_created,
  
                store_link:'baazaar.io/'+user.user_name
                
              }
              console.log(data)
              response.push(data);
            }
            // })
    
            return res.status(200).json({
                message: "Vendors!",
                data: response,
                err: null
            })
        })
        .catch(err => {
          console.log(err)
            return res.status(500).send({ message: 'Error!', data: null, err: err });
        })
      },

    

      vendor_details: (req, res, next) => {   
        User_Mod.findOne({
          where: { 
            id: req.body.id
          }
             
        }).then(async vendor => {
    
          if(!vendor ||vendor.length == 0)
            return res.send(404).send({ message: 'Vendor not found!', data: null, err: null });
    
             let response = [];
             let kyc_status="";
             let m_p_status="";

             const storeId = await Store_Mod.findOne({ where : { user_id: req.body.id }, attributes: ['id']})
             const store = await Store_Mod.findOne({ where : { user_id: req.body.id }, attributes: ['store_name']})
             const industryid = await Store_Mod.findOne({ where : { user_id: req.body.id }, attributes: ['industry_id']})

             const industry_type = await Industry_Mod.findOne({ where : { id: industryid.industry_id }, attributes: ['industry_name']})
             const kyc_count = await Kyc_Mod.count({ where: { master_user_id: vendor.master_user_id }});
             const product_count = await Product_Mod.count({ where: { user_id: vendor.id }});

            const total_customers = await Order_Mod.count({distinct: true, col: 'customer_id', where: { user_id: vendor.id } });
             
            const i_m_p_a = await Store_Mod.findOne({ where : { user_id: req.body.id }, attributes: ['is_marketplace_active']})
             
             if(kyc_count===0)
             {  
              kyc_status="Pending"       
             }
             else
             {
              kyc_status="Completd"
             }

             if(i_m_p_a.is_marketplace_active===true)
             {  
              m_p_status="Active"       
             }
             else
             {
              m_p_status="Pending"
             }


             const totalAmount = await Order_Mod.findAll({where: { user_id: req.body.id},
              attributes: [
                'user_id',
                [sequelize.fn('sum', sequelize.col('total_mrp')), 'total_amount'],
              ],
              group: ['user_id'],
              raw: true
            });


              const data = {
                id:vendor.id,
                store_id:storeId.id,
                store_name:store.store_name,
                kyc_status:kyc_status,
                mp_status:m_p_status,
                skyber_id:vendor.skyberid_id,
                contact_no:vendor.contact_no,
                industry_type:industry_type.industry_name,
                store_link:'baazaar.io/'+vendor.user_name,
                product_count:product_count,
                total_customers:total_customers,
                total_sales:totalAmount[0].total_amount
       
              }
              response.push(data); 

              return res.status(200).json({
                message: "Vendor!",
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



      vendor_orders: (req, res, next) => {  
        Order_Mod.findAll({
          where: { 
            user_id: req.body.id
          },
          order: [
            ['id', 'DESC']
        ]
        }).then(async orders => {
          if(!orders ||orders.length == 0)
            return res.send(404).send({ message: 'Orders not found!', data: null, err: null });
            let response = [];    
            for(let order of orders){                
              const cust_name = await Customer_Mod.findOne({ where : {id: order.customer_id }, attributes: ['customer_name']})

              const data = {
                id:order.id,
                order_no: order.order_id,
                customer_name:cust_name.customer_name,
                order_place_on: order.order_date,
                order_status: order.order_status,
                delivery: order.delivery_mode,
                payment_status: order.payment_method,
                order_value:order.total_mrp,
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


      vendor_products: (req, res, next) => {  
        Product_Mod.findAll({
          where: { 
            user_id: req.body.id
          },
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
                if(product.product_type==='Simple')
                {
                  s_price=product.selling_price;
                }
                else
                {
                  const s_p = await Variable_Product_Mod.findOne({ where : {product_id: product.id }, attributes: ['selling_price']});
                  s_price=s_p.selling_price;
                }

                const n_o_p_s = await Order_Details_Mod.count({ where: { product_id: product.id,user_id:req.body.id }});


              const data = {
                id:product.id,
                product_name: product.product_name,
                child_category:child_cat.childcategory_name,
                product_type:product.product_type,
                selling_price:s_price,
                purchase:n_o_p_s
               
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



      vendor_order_details: (req, res, next) => {   
        Order_Mod.findOne({
          where: { 
            id: req.body.id
          }
             
        }).then(async order_detail => {
    
          if(!order_detail ||order_detail.length == 0)

            return res.send(404).send({ message: 'Order detail not found!', data: null, err: null });
    
             let response = [];
            //  let kyc_status="";
            //  let m_p_status="";


            const Cust_name = await Customer_Mod.findOne({ where : {id: order_detail.customer_id }, attributes: ['customer_name']})
            const Cust_mobile = await Customer_Mod.findOne({ where : {id: order_detail.customer_id }, attributes: ['mobile_number']})

            const str_name = await Store_Mod.findOne({ where : {user_id: order_detail.user_id }, attributes: ['store_name']})

          
            //  const store = await Store_Mod.findOne({ where : { user_id: req.body.id }, attributes: ['store_name']})
            //  const industryid = await Store_Mod.findOne({ where : { user_id: req.body.id }, attributes: ['industry_id']})

            //  const industry_type = await Industry_Mod.findOne({ where : { id: industryid.industry_id }, attributes: ['industry_name']})
            //  const kyc_count = await Kyc_Mod.count({ where: { master_user_id: vendor.master_user_id }});
            //  const product_count = await Product_Mod.count({ where: { user_id: vendor.id }});

            // const total_customers = await Order_Mod.count({distinct: true, col: 'customer_id', where: { user_id: vendor.id } });
             
            // const i_m_p_a = await Store_Mod.findOne({ where : { user_id: req.body.id }, attributes: ['is_marketplace_active']})
             
            //  if(kyc_count===0)
            //  {  
            //   kyc_status="Pending"       
            //  }
            //  else
            //  {
            //   kyc_status="Completd"
            //  }

            //  if(i_m_p_a.is_marketplace_active===true)
            //  {  
            //   m_p_status="Active"       
            //  }
            //  else
            //  {
            //   m_p_status="Pending"
            //  }


            //  const totalAmount = await Order_Mod.findAll({where: { user_id: req.body.id},
            //   attributes: [
            //     'user_id',
            //     [sequelize.fn('sum', sequelize.col('total_mrp')), 'total_amount'],
            //   ],
            //   group: ['user_id'],
            //   raw: true
            // });


              const data = {
                id:order_detail.id,
                order_id:order_detail.order_id,
 
                store_name: str_name.store_name == null ? 'N/A' : str_name.store_name,

                order_date: order_detail.order_date == null ? 'N/A' : moment(order_detail.order_date).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),
                order_confirm_date: order_detail.order_confirm_date == null ? 'N/A' : moment(order_detail.order_confirm_date).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),
                order_delivered_date: order_detail.order_delivered_date == null ? 'N/A' : moment(order_detail.order_delivered_date).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),

                note: order_detail.note == null ? 'N/A' : order_detail.note,

                customer_name:Cust_name.customer_name,
                customer_mobile:Cust_mobile.mobile_number,
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



      vendor_store_details: (req, res, next) => {   
        Store_Mod.findOne({
          where: { 
            id: req.body.id
          }
             
        }).then(async store => {
    
          if(!store ||store.length == 0)
            return res.send(404).send({ message: 'Store not found!', data: null, err: null });
    
             let response = [];
             let store_pickup="";

            //  let kyc_status="";
            //  let m_p_status="";

             const userId = await Store_Mod.findOne({ where : { id: req.body.id }, attributes: ['user_id']})
             const masterUserId = await User_Mod.findOne({ where : { id: userId.user_id }, attributes: ['master_user_id']})

          
             var entity_type = await Kyc_Mod.findOne({ where : { master_user_id: masterUserId.master_user_id }, attributes: ['entity_type']})
             const isAdharVerified = await Kyc_Mod.findOne({ where : { master_user_id: masterUserId.master_user_id }, attributes: ['is_adhar_verified']})
             const isPanVerified = await Kyc_Mod.findOne({ where : { master_user_id: masterUserId.master_user_id }, attributes: ['is_pan_verified']})
             const isGstVerified = await Kyc_Mod.findOne({ where : { master_user_id: masterUserId.master_user_id }, attributes: ['is_gst_verified']})
             const createdAt = await Kyc_Mod.findOne({ where : { master_user_id: masterUserId.master_user_id }, attributes: ['created_at']})
             const adharCreated = await Kyc_Mod.findOne({ where : { master_user_id: masterUserId.master_user_id }, attributes: ['adhar_created']})
             const panCreated = await Kyc_Mod.findOne({ where : { master_user_id: masterUserId.master_user_id }, attributes: ['pan_created']})
             const gstCreated = await Kyc_Mod.findOne({ where : { master_user_id: masterUserId.master_user_id }, attributes: ['gst_created']})
            

              
            const facebookName = await Social_Media_Mod.findOne({ where : { user_id: userId.user_id }, attributes: ['facebook_name']})
            const instaName = await Social_Media_Mod.findOne({ where : { user_id: userId.user_id }, attributes: ['insta_name']})
            const youtubeName = await Social_Media_Mod.findOne({ where : { user_id: userId.user_id }, attributes: ['youtube_name']})

                  
           

            

              const data = {
                id:store.id,
                store_name:store.store_name,
                logo_img:store.logo_img,
                status:store.status,
                allow_store_pickup: store.allow_store_pickup == true ? 'Yes' :store.allow_store_pickup == false ? 'No' :store.allow_store_pickup,
                store_address:store.store_address,
                allow_free_shipping: store.allow_free_shipping == true ? 'Yes' :store.allow_free_shipping == false ? 'No' :store.allow_free_shipping,

                shipping_amount:store.shipping_amount,
                min_order_amount:store.min_order_amount,

                store_bio: store.store_bio == null ? 'NA' : store.store_bio,
                store_impressions:store.store_impressions,

                created_at: store.created_at == null ? 'N/A' : moment(store.created_at).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),

                online_status: store.online_status == true ? 'A' :store.online_status == false ? 'NA' :store.online_status,
                store_address_two: store.store_address_two == null ? 'NA' : store.store_address_two,
                landmark: store.landmark == null ? 'NA' : store.landmark,

                country: store.country == null ? 'NA' : store.country,

                state: store.state == null ? 'NA' : store.state,
                city: store.city == null ? 'NA' : store.city,
                district: store.district == null ? 'NA' : store.district,
                area_name: store.area_name == null ? 'NA' : store.area_name,
                postal_code: store.postal_code == null ? 'NA' : store.postal_code,

                is_poc_active: store.is_poc_active == true ? 'Yes' :store.is_poc_active == false ? 'No' :store.is_poc_active,
                is_qr_pay_active: store.is_qr_pay_active == true ? 'Yes' :store.is_qr_pay_active == false ? 'No' :store.is_qr_pay_active,

                upi: store.upi == null ? 'NA' : store.upi,
                delivery_radius: store.delivery_radius == null ? 'NA' : store.delivery_radius,

                is_marketplace_active: store.is_marketplace_active == true ? 'Yes' :store.is_marketplace_active == false ? 'No' :store.is_marketplace_active,


                
                entity_type: entity_type == null ? 'NA' : entity_type.entity_type,    
                is_adhar_verified:isAdharVerified == null ? 'NA' : isAdharVerified.is_adhar_verified == true ? 'Yes' :isAdharVerified.is_adhar_verified == false ? 'No' :isAdharVerified.is_adhar_verified,
                is_pan_verified: isPanVerified == null ? 'NA' :isPanVerified.is_pan_verified == true ? 'Yes' :isPanVerified.is_pan_verified == false ? 'No' :isPanVerified.is_pan_verified,
                is_gst_verified:isGstVerified == null ? 'NA' : isGstVerified.is_gst_verified == true ? 'Yes' :isGstVerified.is_gst_verified == false ? 'No' :isGstVerified.is_gst_verified,
                createdat: createdAt == null ? 'NA' : createdAt.created_at == null ? 'NA' : moment(createdAt.created_at).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),
                adhar_created:adharCreated == null ? 'NA' : adharCreated.adhar_created == null ? 'NA' : moment(adharCreated.adhar_created).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),
                pan_created: panCreated == null ? 'NA' :panCreated.pan_created == null ? 'NA' : moment(panCreated.pan_created).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),
                gst_created: gstCreated == null ? 'NA' : gstCreated.gst_created == null ? 'NA' : moment(gstCreated.gst_created).add(330, 'minutes').format('DD MMM YYYY hh:mm A'),


                facebook_name:facebookName == null ? 'NA' : facebookName.facebook_name == null ? 'NA' : facebookName.facebook_name,
                 insta_name:instaName == null ? 'NA' : instaName.insta_name == null ? 'NA' : instaName.insta_name,
                 youtube_name:youtubeName == null ? 'NA' : youtubeName.youtube_name == null ? 'NA' : youtubeName.youtube_name,

                 user_id:userId == null ? '0' : userId.user_id == null ? '0' : userId.user_id

                   
              }
              response.push(data); 

              return res.status(200).json({
                message: "Store!",
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




      vendor_coupon_list: (req, res, next) => {
        // if(!req.query.page)
        //   return res.status(400).send({ message: 'Page required!', data: null, err: null });
    
        // let limit = 10
        // let offset = 0 + (req.query.page - 1) * limit;
    
        Coupon_Mod.findAll({
            where: { 
              user_id: req.body.user_id
            },
          //   include: [{ model: City_Mod, as: 'city', attributes: ['name'] }],
            // offset: offset,
            // limit: limit,
            // order: [
            //     ['id', 'DESC']
            //]
        }).then(async  coupons => {
    
          if(! coupons ||coupons.length == 0)
            return res.send(404).send({ message: 'Coupons not found!', data: null, err: null });
            let response = [];
           
            for(let coupon of coupons){
         
              const data = {
                id:coupon.id,
                coupon_code: coupon.coupon_code == null ? 'NA' : coupon.coupon_code,
                coupon_type: coupon.coupon_type == null ? 'NA' : coupon.coupon_type,
                amount: coupon.amount == null ? 'NA' : coupon.amount,
                min_cart_amount: coupon.min_cart_amount == null ? 'NA' : coupon.min_cart_amount,
                expiry_date: coupon.expiry_date == null ? 'NA' : moment(coupon.expiry_date).format("DD-MM-YYYY"),
                coupon_status: coupon.status == null ? 'NA' : coupon.status,
                once_per_user: coupon.once_per_user == true ? 'Yes' :coupon.once_per_user == false ? 'No' :coupon.once_per_user,
                display_for_all: coupon.display_for_all == true ? 'Yes' :coupon.display_for_all == false ? 'No' :coupon.display_for_all,
                max_discount: coupon.max_discount == null ? 'NA' : coupon.max_discount,
                  
              }
              console.log(data)
              response.push(data);
            }
            // })
    
            return res.status(200).json({
                message: "Coupons!",
                data: response,
                err: null
            })
        })
        .catch(err => {
          console.log(err)
            return res.status(500).send({ message: 'Error!', data: null, err: err });
        })
      },


      update_mps: (req, res, next) => {
        let m_p_s="";
       if(req.body.status==="Active")
        {
          m_p_s=false;
          
        }
        else if(req.body.status==="Pending")
        {
          m_p_s=true;
        }
       

        Store_Mod.update({ 
        
          is_marketplace_active:m_p_s
          },
            { 
            where: { user_id: req.body.user_id } 
          })
      
        .then(updated_mps => {	
          if(updated_mps){	
            res.status(200).send({ message: 'Status updated successfully!', data:null, err: null });
          }
          else{
            res.status(500).send({ message: 'Error while updating status', data: null, err: null });
          }
        
        }).catch(err => {
          console.log(err)
        })
      },
    



 
}
