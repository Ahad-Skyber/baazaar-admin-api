const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Category_Type_Mod = models.category_type_mod;

module.exports = {

	add_category_type: (req, res, next) => {
		Category_Type_Mod.findAll({
			where: {
				category_type_name: req.body.category_type_name
				
		}
	}
	)
		.then(category_type => {
			if(category_type.length > 0){
      
				res.status(201).send({ message: 'Category Type already exists.', data:null, err: null });
		
			}
			else{	
			
				Category_Type_Mod.create({
							
                    category_type_name:req.body.category_type_name,status:'Active',category_type_img:null

				})
				.then( newCategory_Type => {
					if(newCategory_Type){
						
						res.status(200).send({ message: 'Success', data:null, err: null });

					}
					else{

						res.status(400).send({ message: 'Error while adding category type', data:null, err: null });
	
					}
				});



			}
		}).catch(err => {
			console.log(err)
		})

	},


	category_type_list: (req, res, next) => {
		Category_Type_Mod.findAll()
		.then( categories_type => {
			if(categories_type.length > 0){
				res.status(200).send({ message: 'Category type list!', data: categories_type, err: null });
			}
			else{
				res.status(404).send({ message: 'No category type found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},

	category_type_on_id: (req, res, next) => {
		Category_Type_Mod.findAll({
			where: {
				id: req.body.id
		}
	}
	)
		.then( category_type => {
			if(category_type.length > 0){
				res.status(200).send({ message: 'Category type details!', data: category_type, err: null });
			}
			else{
				res.status(404).send({ message: 'No category type found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},


	update_category_type: (req, res, next) => {

		Category_Type_Mod.update({ 
			
			category_type_name:req.body.category_type_name, status:req.body.status,category_type_img:null
			},
		    { 
				where: { id: req.body.id } 
			})
	
		.then(updated_category_type => {	
			if(updated_category_type){	
				res.status(200).send({ message: 'Category type updated successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while updating category type', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},


	delete_category_type: (req, res, next) => {

		Category_Type_Mod.destroy({ 
				where: { id: req.body.id } 
			})
	
		.then(deleted_category_type => {	
			if(deleted_category_type){
				res.status(200).send({ message: 'Category type deleted successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while deleted category type', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},



}
