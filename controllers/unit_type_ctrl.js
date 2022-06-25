
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Unit_Type_Mod = models.unit_type_mod;

const moment = require('moment');

const { Op } = require('sequelize');
var sequelize = require("sequelize");


module.exports = {


	add_unit_type: (req, res, next) => {

		let p_s="";
		if(req.body.is_popular==="Yes")
		 {
		   p_s=true;
		   
		 }
		 else if(req.body.is_popular==="No")
		 {
		   p_s=false;
		 }

		Unit_Type_Mod.findAll({
			where: {
				singular_unit: req.body.singular_unit,
                plural_unit: req.body.plural_unit,
                front_singular_unit: req.body.front_singular_unit,
                front_plural_unit: req.body.front_plural_unit
				
		}
	}
	)
		.then(unit_type => {
			if(unit_type.length > 0){
      
				res.status(201).send({ message: 'Unit type already exists.', data:null, err: null });
			}
			else{	
			
				Unit_Type_Mod.create({
							
                    singular_unit:req.body.singular_unit,plural_unit: req.body.plural_unit,front_singular_unit: req.body.front_singular_unit,front_plural_unit: req.body.front_plural_unit,is_popular:p_s,status:'Active'

				})
				.then( newUnitType=> {
					if(newUnitType){
						
						res.status(200).send({ message: 'Success', data:null, err: null });

					}
					else{

						res.status(400).send({ message: 'Error while adding unit type', data:null, err: null });
	
					}
				});

			}
		}).catch(err => {
			console.log(err)
		})

	},


	unit_type_list: (req, res, next) => {
		Unit_Type_Mod.findAll()
		.then( unit_types => {
			if(unit_types.length > 0){
				res.status(200).send({ message: 'Unit type list!', data: unit_types, err: null });
			}
			else{
				res.status(404).send({ message: 'No unit type found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},

    // unit_type_on_id: (req, res, next) => {
	// 	Unit_Type_Mod.findAll({
	// 		where: {
	// 			id: req.body.id
	// 	}
	// }
	// )
	// 	.then(unit_type => {
	// 		if(unit_type.length > 0){
	// 			res.status(200).send({ message: 'Unit type details!', data: unit_type, err: null });
	// 		}
	// 		else{
	// 			res.status(404).send({ message: 'No unit type found!', data: null, err: null });
	// 		}
	// 	}).catch(err => {
	// 		console.log(err)
	// 	})

	// },

	unit_type_on_id: (req, res, next) => {   
        Unit_Type_Mod.findOne({
          where: { 
            id: req.body.id
          }
             
        }).then(async unit_type => {
    
          if(!unit_type ||unit_type.length == 0)
            return res.send(404).send({ message: 'Unit type details!', data: null, err: null });
			let response = [];
              const data = {

                id:unit_type.id,
                singular_unit:unit_type.singular_unit,
                plural_unit:unit_type.plural_unit, 
                front_singular_unit:unit_type.front_singular_unit,
                front_plural_unit:unit_type.front_plural_unit,
				is_popular: unit_type.is_popular == true ? 'Yes' :unit_type.is_popular == false ? 'No' :unit_type.is_popular,
                status:unit_type.status,
				created_at:unit_type.created_at,
                updated_at:unit_type.updated_at
       
              }
             response.push(data); 


              return res.status(200).json({
                message: "Units!",
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








	update_unit_type: (req, res, next) => {
		let p_s="";
		if(req.body.is_popular==="Yes")
		 {
		   p_s=true;
		   
		 }
		 else if(req.body.is_popular==="No")
		 {
		   p_s=false;
		 }
		
		Unit_Type_Mod.update({ 
			
            singular_unit:req.body.singular_unit,plural_unit: req.body.plural_unit,front_singular_unit: req.body.front_singular_unit,front_plural_unit: req.body.front_plural_unit,is_popular:p_s,status:req.body.status

			},
		    { 
				where: { id: req.body.id } 
			})
	
		.then(updated_unit_type => {	
			if(updated_unit_type){	
				res.status(200).send({ message: 'Unit type updated successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while updating unit type', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},


	delete_unit_type: (req, res, next) => {

		Unit_Type_Mod.destroy({ 
				where: { id: req.body.id } 
			})
	
		.then(deleted_unit_type => {	
			if(deleted_unit_type){
				res.status(200).send({ message: 'Unit type deleted successfully!', data:null, err: null });
			}
			else{
				res.status(500).send({ message: 'Error while deleted unit type', data: null, err: null });
			}
		
		}).catch(err => {
			console.log(err)
		})
	},



}
