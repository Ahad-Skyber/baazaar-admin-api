
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Child_Category_Mod = models.child_category_mod;


module.exports = {

	add_child_category: (req, res, next) => {
		Child_Category_Mod.findAll({
			where: {
				category_id: req.body.category_id,
                sub_category_id: req.body.sub_category_id,
                childcategory_name: req.body.childcategory_name
				
		}
	}
	)
		.then(child_category => {
			if(child_category.length > 0){
      
				res.status(201).send({ message: 'Child category already exists.', data:null, err: null });
		
			}
			else{	
			
				Child_Category_Mod.create({
							
                    childcategory_name:req.body.childcategory_name,status:'Active',childcategory_img_url:null,category_id: req.body.category_id,sub_category_id:req.body.sub_category_id

				})
				.then( newChild_Category => {
					if(newChild_Category){
						
						res.status(200).send({ message: 'Success', data:null, err: null });

					}
					else{

						res.status(400).send({ message: 'Error while adding child category', data:null, err: null });
	
					}
				});



			}
		}).catch(err => {
			console.log(err)
		})

	},


	child_category_list: (req, res, next) => {
		Child_Category_Mod.findAll()
		.then( child_categories => {
			if(child_categories.length > 0){
				res.status(200).send({ message: 'Child category list!', data: child_categories, err: null });
			}
			else{
				res.status(404).send({ message: 'No child category found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},

	child_category_on_id: (req, res, next) => {
		Child_Category_Mod.findAll({
			where: {
				id: req.body.id
		}
	}
	)
		.then(child_category => {
			if(child_category.length > 0){
				res.status(200).send({ message: 'Child category details!', data: child_category, err: null });
			}
			else{
				res.status(404).send({ message: 'No child category found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},


	update_child_category: (req, res, next) => {

		Child_Category_Mod.update({ 
			
			childcategory_name:req.body.childcategory_name, status:req.body.status, childcategory_img_url:null,category_id: req.body.category_id,sub_category_id:req.body.sub_category_id
			},
		    { 
				where: { id: req.body.id } 
			})
	
		.then(updated_Child_category => {	
			if(updated_Child_category){	
				res.status(200).send({ message: 'Child category updated successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while updating child category', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},


	delete_child_category: (req, res, next) => {

		Child_Category_Mod.destroy({ 
				where: { id: req.body.id } 
			})
	
		.then(deleted_child_category => {	
			if(deleted_child_category){
				res.status(200).send({ message: 'Child category deleted successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while deleted chilt category', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},



}
