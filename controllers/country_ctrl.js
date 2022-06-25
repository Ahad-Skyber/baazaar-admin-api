
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Country_Mod = models.country_mod;

const moment = require('moment');

const { Op } = require('sequelize');
var sequelize = require("sequelize");


module.exports = {

    country_list: (req, res, next) => {
    
        Country_Mod.findAll({  

        }).then(async countries => {
    
          if(!countries ||countries.length == 0)
            return res.send(404).send({ message: 'Countries not found!', data: null, err: null });
            let response = [];
            
            for(let country of countries){
     
              const data = {
                id:country.id,
                country_name:country.country_name,
                country_flag_img:country.country_flag_img,    
                is_popular: country.is_popular == true ? 'Yes' :country.is_popular == false ? 'No' :country.is_popular,
                status:country.status,
                created_at:country.created_at,
                updated_at:country.updated_at
                
              }
              response.push(data);
            }
           
    
            return res.status(200).json({
                message: "Countries!",
                data: response,
                err: null
            })
        })
        .catch(err => {
          console.log(err)
            return res.status(500).send({ message: 'Error!', data: null, err: err });
        })
      },


	add_country: (req, res, next) => {

		let p_s="";
		if(req.body.is_popular==="Yes")
		 {
		   p_s=true;
		 }
		 else if(req.body.is_popular==="No")
		 {
		   p_s=false;
		 }

		Country_Mod.findAll({
			where: {
				country_name: req.body.country_name,			
		}
	}
	)
		.then(country => {
			if(country.length > 0){
				res.status(201).send({ message: 'Country already exists.', data:null, err: null });
			}
			else{	
				Country_Mod.create({			
                    country_name:req.body.country_name,is_popular:p_s,status:req.body.status
				})
				.then(newCountry=> {
					if(newCountry){	
						res.status(200).send({ message: 'Success', data:null, err: null });
					}
					else{
						res.status(400).send({ message: 'Error while adding country', data:null, err: null });
					}
				});

			}
		}).catch(err => {
			console.log(err)
		})

	},


    country_on_id: (req, res, next) => {
    
        Country_Mod.findOne({  
            where: { 
                id: req.body.id
              }

        }).then(async country => {
    
          if(!country ||country.length == 0)
            return res.send(404).send({ message: 'Country not found!', data: null, err: null });
            let response = [];
            
              const data = {
                id:country.id,
                country_name:country.country_name,
                country_flag_img: country.country_flag_img == null ? 'NA' : country.country_flag_img,   
                is_popular: country.is_popular == true ? 'Yes' :country.is_popular == false ? 'No' :country.is_popular,
                status:country.status,
                created_at:country.created_at,
                updated_at:country.updated_at
                
              }
              response.push(data);
         
            return res.status(200).json({
                message: "Country!",
                data: response,
                err: null
            })
        })
        .catch(err => {
          console.log(err)
            return res.status(500).send({ message: 'Error!', data: null, err: err });
        })
      },



	update_country: (req, res, next) => {
		let p_s="";
		if(req.body.is_popular==="Yes")
		 {
		   p_s=true;
		   
		 }
		 else if(req.body.is_popular==="No")
		 {
		   p_s=false;
		 }
		
		Country_Mod.update({ 
			
            country_name:req.body.country_name,is_popular:p_s,status:req.body.status

			},
		    { 
				where: { id: req.body.id } 
			})
	
		.then(updated_country => {	
			if(updated_country){	
				res.status(200).send({ message: 'Country updated successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while updating country', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},


	delete_country: (req, res, next) => {

		Country_Mod.destroy({ 
				where: { id: req.body.id } 
			})
	
		.then(deleted_country => {	
			if(deleted_country){
				res.status(200).send({ message: 'country deleted successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while deleted country', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},



}
