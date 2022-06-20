
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Category_Mod = models.category_mod;


module.exports = {

	add_category: (req, res, next) => {
		Category_Mod.findAll({
			where: {
				category_name: req.body.category_name
				
		}
	}
	)
		.then(category => {
			if(category.length > 0){
      
				res.status(201).send({ message: 'Category already exists.', data:null, err: null });
		
			}
			else{	
			
				Category_Mod.create({
							
                    category_name:req.body.category_name,status:'Active',category_img_url:null

				})
				.then( newCategory => {
					if(newCategory){
						
						res.status(200).send({ message: 'Success', data:null, err: null });

					}
					else{

						res.status(400).send({ message: 'Error while adding category', data:null, err: null });
	
					}
				});



			}
		}).catch(err => {
			console.log(err)
		})

	},


	category_list: (req, res, next) => {
		Category_Mod.findAll()
		.then( categories => {
			if(categories.length > 0){
				res.status(200).send({ message: 'Category list!', data: categories, err: null });
			}
			else{
				res.status(404).send({ message: 'No category found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},

	category_on_id: (req, res, next) => {
		Category_Mod.findAll({
			where: {
				id: req.body.id
		}
	}
	)
		.then( category => {
			if(category.length > 0){
				res.status(200).send({ message: 'Category details!', data: category, err: null });
			}
			else{
				res.status(404).send({ message: 'No category found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},


	update_category: (req, res, next) => {

		Category_Mod.update({ 
			
			category_name:req.body.category_name, status:req.body.status,category_img_url:null
			},
		    { 
				where: { id: req.body.id } 
			})
	
		.then(updated_category => {	
			if(updated_category){	
				res.status(200).send({ message: 'Category updated successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while updating category', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},


	delete_category: (req, res, next) => {

		Category_Mod.destroy({ 
				where: { id: req.body.id } 
			})
	
		.then(deleted_category => {	
			if(deleted_category){
				res.status(200).send({ message: 'Category deleted successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while deleted category', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},



}
