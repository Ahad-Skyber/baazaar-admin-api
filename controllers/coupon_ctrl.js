
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Coupon_Mod = models.coupon_mod;


module.exports = {

	add_coupon: (req, res, next) => {
		Coupon_Mod.findAll({
			where: {
				coupon_code: req.body.coupon_code
				
		}
	}
	)
		.then(coupon => {
			if(coupon.length > 0){
      
				res.status(201).send({ message: 'Coupon already exists.', data:null, err: null });
		
			}
			else{	
			
				Coupon_Mod.create({
							
                    coupon_code:req.body.coupon_code,coupon_type:req.body.coupon_type,amount:req.body.amount,min_cart_amount:req.body.min_cart_amount,expiry_date:req.body.expiry_date ,status:'Active'

				})
				.then( newCoupon => {
					if(newCoupon){
						
						res.status(200).send({ message: 'Success', data:null, err: null });

					}
					else{

						res.status(400).send({ message: 'Error while adding coupon', data:null, err: null });
	
					}
				});



			}
		}).catch(err => {
			console.log(err)
		})

	},


	coupon_list: (req, res, next) => {
		Coupon_Mod.findAll()
		.then(coupons => {
			if(coupons.length > 0){
				res.status(200).send({ message: 'Coupons list!', data: coupons, err: null });
			}
			else{
				res.status(404).send({ message: 'No coupons found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},



	coupon_on_id: (req, res, next) => {
		Coupon_Mod.findAll({
			where: {
				id: req.body.id
		}
	}
	)
		.then(coupon => {
			if(coupon.length > 0){
				res.status(200).send({ message: 'Coupon details!', data: coupon, err: null });
			}
			else{
				res.status(404).send({ message: 'No coupon found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},


	update_coupon: (req, res, next) => {

		Coupon_Mod.update({ 
			
            coupon_code:req.body.coupon_code,coupon_type:req.body.coupon_type,amount:req.body.amount,min_cart_amount:req.body.min_cart_amount,expiry_date:req.body.expiry_date ,status:req.body.status
			},
		    { 
				where: { id: req.body.id } 
			})
	
		.then(updated_coupon => {	
			if(updated_coupon){	
				res.status(200).send({ message: 'Coupon updated successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while updating coupon', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},


	delete_coupon: (req, res, next) => {

		Coupon_Mod.destroy({ 
				where: { id: req.body.id } 
			})
	
		.then(deleted_coupon => {	
			if(deleted_coupon){
				res.status(200).send({ message: 'Coupon deleted successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while deleted coupon', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},



}
