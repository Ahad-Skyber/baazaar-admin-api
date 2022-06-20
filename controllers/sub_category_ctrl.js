
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Sub_Category_Mod = models.sub_category_mod;


module.exports = {

	add_sub_category: (req, res, next) => {
		Sub_Category_Mod.findAll({
			where: {
                category_id: req.body.category_id,
				subcategory_name: req.body.subcategory_name
				
		}
	}
	)
		.then(sub_category => {
			if(sub_category.length > 0){
      
				res.status(201).send({ message: 'Subcategory already exists.', data:null, err: null });
		
			}
			else{	
			
				Sub_Category_Mod.create({
							
               subcategory_name:req.body.subcategory_name,status:'Active',subcategory_img_url:null,category_id: req.body.category_id

				})
				.then( newSubcategory => {
					if(newSubcategory){
						
						res.status(200).send({ message: 'Success', data:null, err: null });

					}
					else{

						res.status(400).send({ message: 'Error while adding subcategory', data:null, err: null });
	
					}
				});



			}
		}).catch(err => {
			console.log(err)
		})

	},


	sub_category_list: (req, res, next) => {
		Sub_Category_Mod.findAll()
		.then(subcategories => {
			if(subcategories.length > 0){
				res.status(200).send({ message: 'Subcategory list!', data: subcategories, err: null });
			}
			else{
				res.status(404).send({ message: 'No subcategory found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},



	sub_category_on_id: (req, res, next) => {
		Sub_Category_Mod.findAll({
			where: {
				id: req.body.id
		}
	}
	)
		.then(subcategory => {
			if(subcategory.length > 0){
				res.status(200).send({ message: 'Subcategory details!', data: subcategory, err: null });
			}
			else{
				res.status(404).send({ message: 'No subcategory found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},


	update_sub_category: (req, res, next) => {

		Sub_Category_Mod.update({ 
			
			subcategory_name:req.body.subcategory_name, status:req.body.status,subcategory_img_url:null,category_id:req.body.category_id
			},
		    { 
				where: { id: req.body.id } 
			})
	
		.then(updated_subcategory => {	
			if(updated_subcategory){	
				res.status(200).send({ message: 'Subcategory updated successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while updating subcategory', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},


	delete_sub_category: (req, res, next) => {

		Sub_Category_Mod.destroy({ 
				where: { id: req.body.id } 
			})
	
		.then(deleted_subcategory => {	
			if(deleted_subcategory){
				res.status(200).send({ message: 'Subcategory deleted successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while deleted subcategory', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},



}
