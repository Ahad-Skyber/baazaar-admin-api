
const SaltRounds = 10;
const bcrypt = require('bcrypt');

const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const {generateToken } = require('../helpers/global');



const Admin_Mod = models.admin_mod;



module.exports = {

	//     admin_login: (req, res, next) => {
	// 	Admin_Mod.findOne({
	// 		where: {
	// 			email: req.body.email,
	// 			password:req.body.password
	// 	}
	// }
	// )
	// 	.then(admin => {
	// 		if(admin){
      
	// 			// res.status(200).send({ message: 'Success', data: {AdminId:admin.id,Type:admin.user_type}, err: null });
	// 			res.status(200).send({ message: 'Success', AdminId:admin.id,Name:admin.name,Type:admin.user_type,data:null, err: null });					
	// 		}
	// 		else{	
			
	// 			//res.status(201).send({ message: 'Email id or password does not match.', data: {AdminId:0,Type:null}, err: null });
	// 			res.status(201).send({ message: 'Email id or password does not match.', AdminId:0,Name:null,Type:null,data:null, err: null });

	// 		}
	// 	}).catch(err => {
	// 		console.log(err)


	// 	})

	// },


	admin_login: (req, res, next) => {
		Admin_Mod.findOne({
			where: {
				email: req.body.email,
				
		}
	}
	)
		.then(admin => {
			if(admin){

				bcrypt.compare(req.body.password, admin.password,  async(err, result) => {
					if (err) {
						return res.status(400).send({ message: 'Something went wrong!', data: null, err: err });
					} else if (result == false) {
						return res.status(202).send({ message: 'Invalid password!', data: null, err: null });
					} else {
						
						
				// res.status(200).send({ message: 'Success', data: {AdminId:admin.id,Type:admin.user_type}, err: null });

				let tokenData = {
					admin_id: admin.id
				};
				let token = generateToken(tokenData);

                // res.cookie("jwt_token",token,{ 
				// expires:new Date(Date.now()+3600000), //1 hour
				// httpOnly:true
				// });

				
				res.status(200).send({ message: 'Success', AdminId:admin.id,Name:admin.name,Type:admin.user_type,Token:token,data:null, err: null });					


					}
					
				})

			}
			else{	
			
				//res.status(201).send({ message: 'Email id does not match.', data: {AdminId:0,Type:null}, err: null });
				res.status(201).send({ message: 'Email id does not match.', AdminId:0,Name:null,Type:null,data:null, err: null });

			}
		}).catch(err => {
			console.log(err)


		})

	},





	add_admin: (req, res, next) => {
		Admin_Mod.findAll({
			where: {
				email: req.body.email
				
		}
	}
	)
		.then(admin => {
			if(admin.length > 0){
      
				res.status(201).send({ message: 'Email id already exists.', data:null, err: null });
			}
			else{	
			
				let salt = bcrypt.genSaltSync(SaltRounds);
				let hash = bcrypt.hashSync(req.body.password, salt);

				Admin_Mod.create({

                    name:req.body.name,contact_no:req.body.contact_no,password:hash,salt:salt,email:req.body.email,user_type:'A'

				})
				.then( newAdmin => {
					if(newAdmin){
						
						res.status(200).send({ message: 'Success', data:null, err: null });

					}
					else{

						res.status(400).send({ message: 'Error while adding admin', data:null, err: null });
	
					}
				});

			}
		}).catch(err => {
			console.log(err)
		})

	},


// 	// baazaar_change_password: (req, res, next) => {

// 	// 	Baazaar_Admin_Mod.findAll({
// 	// 		where: {
// 	// 			Id: req.body.Id,
// 	// 			Password:req.body.OldPassword
				
// 	// 	}
// 	//  }
// 	// )
// 	// 	.then( admin => {
// 	// 		if(admin.length > 0){

// 	// 			Baazaar_Admin_Mod.update({ 
			
// 	// 				Password:req.body.NewPassword, 
// 	// 			},
// 	// 			{ 
// 	// 				where: { Id: req.body.Id,Password:req.body.OldPassword} 
// 	// 			})
		
// 	// 		.then(updated_password => {	
// 	// 			if(updated_password){	
// 	// 				res.status(200).send({ message: 'Password updated successfully!', data:null, err: null });
// 	// 			}
// 	// 			else{
// 	// 				res.status(500).send({ message: 'Error while updating password', data: null, err: null });
// 	// 			}
	
	
// 	// 		})

	
// 	// 		}
// 	// 		else{
// 	// 			res.status(404).send({ message: 'Please enter valid old password!', data: null, err: null });
// 	// 		}
// 	// 	}).catch(err => {
// 	// 		console.log(err)
// 	// 	})

// 	// },


	change_password: (req, res, next) => {

		let salt = bcrypt.genSaltSync(SaltRounds);
		let hash = bcrypt.hashSync(req.body.password, salt);

				 Admin_Mod.update({ 
					 
				 password:hash,salt:salt

				},
				{ 
					where: { id: req.body.id} 
				})
		
			.then(updated_password => {	
				if(updated_password){	
					res.status(200).send({ message: 'Password updated successfully!', data:null, err: null });
				}
				else{
					res.status(500).send({ message: 'Error while updating password', data: null, err: null });
				}
	
			})
	
		.catch(err => {
			console.log(err)
		})

	},



    admin_list: (req, res, next) => {
		Admin_Mod.findAll()
		.then(admins => {
			if(admins.length > 0){
				res.status(200).send({ message: 'admin list!', data: admins, err: null });
			}
			else{
				res.status(404).send({ message: 'No admin found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},


    admin_on_id: (req, res, next) => {
		Admin_Mod.findAll({
			where: {
				id: req.body.id
		}
	}
	)
		.then(admin => {
			if(admin.length > 0){
				res.status(200).send({ message: 'admin details!', data: admin, err: null });
			}
			else{
				res.status(404).send({ message: 'No admin found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},



	update_admin: (req, res, next) => {

		Admin_Mod.update({ 
            name:req.body.name,contact_no:req.body.contact_no
                     
		},
		{ 
			where: { id: req.body.id} 
		})

	.then(updated_admin => {	
		if(updated_admin){	
			res.status(200).send({ message: 'Admin updated successfully!', data:null, err: null });
		}
		else{
			res.status(500).send({ message: 'Error while updating admin', data: null, err: null });
		}

	})

.catch(err => {
	console.log(err)
})

},



delete_admin: (req, res, next) => {

	Admin_Mod.destroy({ 
			where: { id: req.body.id } 
		})

	.then(deleted_admin => {	
		if(deleted_admin){
			res.status(200).send({ message: 'Admin deleted successfully!', data:null, err: null });
		}
		else{
			res.status(500).send({ message: 'Error while deleted admin', data: null, err: null });
		}
	
	}).catch(err => {
		console.log(err)
	})
},








}