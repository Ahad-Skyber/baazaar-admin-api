const express=require('express');
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const moment = require('moment');

//My code
const cookieParser = require("cookie-parser");
//My code
const app=express();
//My code
app.use(cookieParser());
//My code


const Master_User_Mod = models.master_user_mod;
const { Op } = require('sequelize');



module.exports = {

  // user_list: (req, res, next) => {
	// 	Master_User_Mod.findAll()
	// 	.then(users => {
	// 		if(users.length > 0){
	// 			res.status(200).send({ message: 'Users list!', data: users, err: null });
	// 		}
	// 		else{
	// 			res.status(404).send({ message: 'No users found!', data: null, err: null });
	// 		}
	// 	}).catch(err => {
	// 		console.log(err)
	// 	})

	// },


  // user_list_by_dates: (req, res, next) => {

  //   const startedDate = new Date(req.body.from_date);
  //   const endDate = new Date(req.body.to_date);

	// 	Master_User_Mod.findAll({
	// 		where: {
  //       created_at: {[Op.between] : [startedDate , endDate ]}
	// 	}
	// }
	// )
	// 	.then(users => {
	// 		if(users.length > 0){
	// 			res.status(200).send({ message: 'Users list!', data: users, err: null });
	// 		}
	// 		else{
	// 			res.status(404).send({ message: 'No users found!', data: null, err: null });
	// 		}
	// 	}).catch(err => {
	// 		console.log(err)
	// 	})

	// },




 
    user_list:(req, res, next) => { 
        
      // if(!req.query.page)
      //   return res.status(400).send({ message: 'Page required!', data: null, err: null });
  
      // let limit = 10
      // let offset = 0 + (req.query.page - 1) * limit;
  
      Master_User_Mod.findAll({
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
  
        if(users.length == 0)
          return res.send(404).send({ message: 'Users not found!', data: null, err: null });
  
          let response = [];
          
          // customers.map(async customer => {
          for(let user of users){
            //const orders = await Order_Mod.count({ where: { customer_id: customer.id }});
            //const waitlist = await Waitlist.findOne({ where : { customer_id: customer.id }, attributes: ['rank']})
          
           
            const data = {
              id:user.id,
              full_name:user.full_name,
              contact_no: user.contact_no,
              email: user.email,   
              created_at: user.created_at == null ? 'N/A' : moment(user.created_at).add(330, 'minutes').format('DD MMM YYYY'),
              updated_at: user.updated_at == null ? 'N/A' : moment(user.updated_at).add(330, 'minutes').format('DD MMM YYYY'),
              status: user.status,
              
              
            }
            console.log(data)
            response.push(data);
          }
          // })
  
          return res.status(200).json({
              message: "Users!",
              data: response,
              err: null
          })
      })
      .catch(err => {
        console.log(err)
          return res.status(500).send({ message: 'Error!', data: null, err: err });
      })



    },

    user_list_by_dates: (req, res, next) => {

        const startedDate = new Date(req.body.from_date);
        const endDate = new Date(req.body.to_date);

        // if(!req.query.page)
        //   return res.status(400).send({ message: 'Page required!', data: null, err: null });
    
        // let limit = 10
        // let offset = 0 + (req.query.page - 1) * limit;
    
        Master_User_Mod.findAll({
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
    
          if(users.length == 0)
            return res.send(404).send({ message: 'Users not found!', data: null, err: null });
    
            let response = [];
           
           
            // customers.map(async customer => {
            for(let user of users){
              //const orders = await Order_Mod.count({ where: { customer_id: customer.id }});
              //const waitlist = await Waitlist.findOne({ where : { customer_id: customer.id }, attributes: ['rank']})
            
              const data = {
                id:user.id,
                full_name:user.full_name,
                contact_no: user.contact_no,
                email: user.email,   
              
                created_at: user.created_at == null ? 'N/A' : moment(user.created_at).add(330, 'minutes').format('DD MMM YYYY'),
                updated_at: user.updated_at == null ? 'N/A' : moment(user.updated_at).add(330, 'minutes').format('DD MMM YYYY'),

                status: user.status,
                
              }
              console.log(data)
              response.push(data);
            }
            // })
    
            return res.status(200).json({
                message: "Users!",
                data: response,
                err: null
            })
        })
        .catch(err => {
          console.log(err)
            return res.status(500).send({ message: 'Error!', data: null, err: err });
        })
      },


   
}
