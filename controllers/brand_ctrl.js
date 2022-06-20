
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Brand_Mod = models.brand_mod;


module.exports = {


	add_brand: (req, res, next) => {
		Brand_Mod.findAll({
			where: {
				brand_name: req.body.brand_name
				
		}
	}
	)
		.then(brand => {
			if(brand.length > 0){
      
				res.status(201).send({ message: 'Brand already exists.', data:null, err: null });
			}
			else{	
			
				Brand_Mod.create({
							
                    brand_name:req.body.brand_name,status:'Active',brand_img_url:null

				})
				.then( newBrand => {
					if(newBrand){
						
						res.status(200).send({ message: 'Success', data:null, err: null });

					}
					else{

						res.status(400).send({ message: 'Error while adding brand', data:null, err: null });
	
					}
				});

			}
		}).catch(err => {
			console.log(err)
		})

	},


	brand_list: (req, res, next) => {
		Brand_Mod.findAll()
		.then( brands => {
			if(brands.length > 0){
				res.status(200).send({ message: 'brand list!', data: brands, err: null });
			}
			else{
				res.status(404).send({ message: 'No brand found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},

brand_on_id: (req, res, next) => {
		Brand_Mod.findAll({
			where: {
				Id: req.body.Id
		}
	}
	)
		.then( brand => {
			if(brand.length > 0){
				res.status(200).send({ message: 'brand details!', data: brand, err: null });
			}
			else{
				res.status(404).send({ message: 'No brand found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},


	update_brand: (req, res, next) => {

		Brand_Mod.update({ 
			
				brand_name:req.body.brand_name, status:req.body.status
			},
		    { 
				where: { Id: req.body.Id } 
			})
	
		.then(updated_brand => {	
			if(updated_brand){	
				res.status(200).send({ message: 'brand updated successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while updating brand', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},


	delete_brand: (req, res, next) => {

		Brand_Mod.destroy({ 
				where: { Id: req.body.Id } 
			})
	
		.then(deleted_brand => {	
			if(deleted_brand){
				res.status(200).send({ message: 'Brand deleted successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while deleted brand', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},



}
