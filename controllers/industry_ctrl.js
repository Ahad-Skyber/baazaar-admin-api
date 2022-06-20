
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Industry_Mod = models.industry_mod;


module.exports = {

	add_industry: (req, res, next) => {
		Industry_Mod.findAll({
			where: {
				industry_name: req.body.industry_name,
				
				
		}
	}
	)
		.then(industry => {
			if(industry.length > 0){
      
				res.status(201).send({ message: 'Industry already exists.', data:null, err: null });
		
			}
			else{	
			
				Industry_Mod.create({
							
                    industry_name:req.body.industry_name,status:'Active',sub_industry_name:req.body.sub_industry_name, industry_img:null,order:0,industry_banner:null

				})
				.then( newIndustry => {
					if(newIndustry){
						
						res.status(200).send({ message: 'Success', data:null, err: null });

					}
					else{

						res.status(400).send({ message: 'Error while adding industry', data:null, err: null });
	
					}
				});



			}
		}).catch(err => {
			console.log(err)
		})

	},


	industry_list: (req, res, next) => {
		Industry_Mod.findAll()
		.then( industries => {
			if(industries.length > 0){
				res.status(200).send({ message: 'Industry list!', data: industries, err: null });
			}
			else{
				res.status(404).send({ message: 'No industry found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},

	industry_on_id: (req, res, next) => {
		Industry_Mod.findAll({
			where: {
				id: req.body.id
		}
	}
	)
		.then( industry => {
			if(industry.length > 0){
				res.status(200).send({ message: 'industry details!', data: industry, err: null });
			}
			else{
				res.status(404).send({ message: 'No industry found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},


	update_industry: (req, res, next) => {

		Industry_Mod.update({ 
			
			industry_name:req.body.industry_name, status:req.body.status,sub_industry_name:req.body.sub_industry_name,industry_img:null,industry_banner:null
			},
		    { 
				where: { id: req.body.id } 
			})
	
		.then(updated_industry => {	
			if(updated_industry){	
				res.status(200).send({ message: 'Industry updated successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while updating industry', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},


	delete_industry: (req, res, next) => {

		Industry_Mod.destroy({ 
				where: { id: req.body.id } 
			})
	
		.then(deleted_industry => {	
			if(deleted_industry){
				res.status(200).send({ message: 'Industry deleted successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while deleted industry', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},



}
