const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "blueBayJersey1!";
const now = require("nano-time");
const model = require('../config/seqConfig');
// const NotificationMatrix = model.notificationMatrix;
const moment = require("moment");
const multer = require('multer');
const https = require("https");

// // const validatorModel = require("../models/queries");
// // const queryModel = require("../models/queries");
// const con = require("../config/conn");
// var fs = require('fs');
// const exec = require("child_process").exec
// var request = require('request');




module.exports = {
	generateToken: function (data) {
		return jwt.sign(data, TOKEN_SECRET, {
			algorithm: "HS512",
			// expiresIn: "10h"
            expiresIn: "7200000"  //2 hour
		});
	},

	// generateOTP: function () {
	// 	return otpGenerator.generate(4, {
	// 		upperCase: false,
	// 		specialChars: false,
	// 		alphabets: false
	// 	});
	// 	return otp;
	// 	// return 1234;
	// },

	// generateRefNo: function (data) {
	// 	let today = new Date();
	// 	let dd = today.getDate();
	// 	let mm =
	// 		today.getMonth() + 1 < 10
	// 			? "0" + (today.getMonth() + 1)
	// 			: today.getMonth() + 1;
	// 	let year = today.getFullYear();

	// 	let yy = year.toString().slice(-2);

	// 	let date = yy + mm + dd;
	// 	let token = data
	// 		.split("Bearer ")[1]
	// 		.replace(/[^\w\s]/gi, '')
    // 		.replace(/_/g, '')
	// 		.slice(-6)
	// 		.toUpperCase();
	// 	let b = now.micro();
	// 	let refNo = date + b.slice(-8) + token;

	// 	return refNo;
	// },

	// getDetailsFromDB: async function({ schema, query, fields }) {
    // 	return await schema
    //     .findOne(query)
    //     .then((data) => {
    //         if (!data) {
    //             throw new Error("data not found in with query:" + JSON.stringify(query));
    //         }
    //         return data;
    //     })
    //     .catch((err) => {
    //         throw new Error(err);
    //     });
	// },

	// sendOtp: function (contact_no, otp){
	// 	return new Promise((resolve,reject)=>{
	// 		// template_id=5fa9356ba97d8d2da61e3319
	// 		var options = {
	// 			"method": "GET",
	// 			"hostname": "api.msg91.com",
	// 			"port": null,
	// 			"path": `/api/v5/otp?invisible=1&authkey=346410AGS5iN8lMojC5fa4020dP1&mobile=91${contact_no}&template_id=5fc0f0a37835ec3bde6d9e23&otp=${otp}`,
	// 			"headers": {
	// 			  "content-type": "application/json"
	// 			}
	// 		};
			
	// 		var req = https.request(options, function (res) {

	// 		  var chunks = [];

	// 		  res.on("data", function (chunk) {
	// 		    chunks.push(chunk);
	// 		  });

	// 		  res.on("end", function () {
	// 		    var body = Buffer.concat(chunks);
	// 		    console.log(body.toString());
	// 		    resolve(body.toString())
	// 		  });
	// 		});
	// 		req.end();	
	// 	})
	// },

	// // getStore: async function(user_id){
		
	// // 	shipping_result = await model.sequelize.query(`SELECT *	FROM store where user_id = ${user_id};`, {
	// // 	    type: model.sequelize.QueryTypes.SELECT
	// // 	});

	// // 	if(shipping_result.length > 0)
	// // 		return shipping_result[0];
	// // 	else
	// // 		return null;
	// // },
	// getStore: async function(user_id){
		
	// 	return await Store
    //     .findOne({ 
    //     	where: { user_id: user_id },
    //     	include: [{ model: CategoryType, as: 'category_type'}, { model: Industry, as: 'industry'}]
    //     })
    //     .then((data) => {
    //         if (data) {
    //            return data;
    //         }
    //         else{
    //         	return null;
    //         }
    //     })
    //     .catch((err) => {
    //         throw new Error(err);
    //     });
	// },

	// getVendor: async function(user_name) {
    // 	return await User
    //     .findOne({ where: { user_name: user_name }})
    //     .then((data) => {
    //         if (data) {
    //            return data;
    //         }
    //         else{
    //         	return null;
    //         }
    //     })
    //     .catch((err) => {
    //         throw new Error(err);
    //     });
	// },

	// // getVariations: async function(product_id, user_id) {
	// getVariations: async function(product_id) {
    // 	return await Variation
    //     // .findAll({ where: { product_id: product_id, user_id: user_id }})
    //     .findAll({ where: { product_id: product_id }})
    //     .then((variations) => {
    //         if (variations.length > 0) {
    //         	let variationData = variations.map( variation => {
	// 				return {
	// 					id: variation.id,
	// 					variation_name: variation.variation_name,
	// 					variation_value: variation.variation_value,
	// 					status: variation.status
	// 				}

	// 				// return {
	// 				// 	variation_name: variation.variation_name,
	// 				// 	variation_value: variation.variation_value,
	// 				// }
	// 			});
    //         	// console.log(variationData)
    //         	// const groupByVariationName = groupBy('variation_name');
    //         	// var finalVariationData = groupByVariationName(variationData);

    //         	// console.log(a)

	// 			return variationData;
    //         }
    //         else{
    //         	return [];
    //         }
    //     })
    //     .catch((err) => {
    //         throw new Error(err);
    //     });
	// },

	// getProductWithVariations: async function(product_id) {
    // 	return await Product
    //     // .findAll({ where: { product_id: product_id, user_id: user_id }})
    //     .findOne({ 
    //     	where: { id: product_id },
    //     	include: [{ model: User , as: 'user'},{ model: Category , as: 'category'},{ model: SubCategory , as: 'sub_category'},{ model: ProductType , as: 'product_type'}]
    //     })
    //     .then(async product => {
    //         if (product) {
    //         	variations = await productVariations(product_id)
            	
    //         	let productData =  {
	// 				id: product.id,
	// 				product_name: product.product_name,
	// 				mrp: product.mrp,
	// 				selling_price: product.selling_price,
	// 				pieces: product.pieces,
	// 				discount: product.discount,
	// 				product_img_url: product.product_img_url,
	// 				product_img_url_2: product.product_img_url_2,
	// 				product_img_url_3: product.product_img_url_3,
	// 				product_img_url_4:product.product_img_url_4,
	// 				product_img_url_5: product.product_img_url_5,
	// 				product_description: product.product_description,
	// 				status: product.status,
	// 				user_id: product.user_id,
	// 				user_name: product.user.user_name,
	// 				category_id: product.category_id,
	// 				category_name: product.category.category_name,
	// 				sub_category_id: product.sub_category_id,
	// 				subcategory_name: product.sub_category.subcategory_name,
	// 				product_type_id: product.product_type_id,
	// 				product_type_name: product.product_type.product_type_name,
	// 				created_at: moment(product.created_at).format("DD-MM-YYYY"),
	// 				variations: variations
	// 			}

	// 			return variationData;
    //         }
    //         else{
    //         	return {};
    //         }
    //     })
    //     .catch((err) => {
    //         throw new Error(err);
    //     });
	// },

	// checkStore: async function(contact_no){
		
	// 	return await User
	// 	.findOne({ 
	// 		where: {contact_no: contact_no} 
	// 	}).then(async user => {

	// 		return await Store.findOne({ 
	//         	where: { user_id: user.id },
	//         })
	//         .then((data) => {
	//             if (data) 
	//                return true;
	//             else
	//             	return false;
	//         });
	// 	})
    //     .catch((err) => {
    //         throw new Error(err);
    //     });
	// },

	// checkUsername: async function(contact_no){
		
	// 	return await User
	// 	.findOne({ 
	// 		where: {contact_no: contact_no} 
	// 	}).then(async user => {
			
    //         if (user.user_name) 
    //            return true;
    //         else
    //         	return false;
	// 	})
    //     .catch((err) => {
    //         throw new Error(err);
    //     });
	// },


	// productCount: async function(sub_category_id){
		
	// 	return await Product
	// 	.count({ 
	// 		where: {sub_category_id: sub_category_id} 
	// 	}).then(async product_count => {
	// 			console.log(product_count)
	// 		if(product_count)
	// 			return product_count;
	// 		else
	// 			return 0;
	// 		})
    //     .catch((err) => {
    //         throw new Error(err);
    //     });
	// },

	// getCartVariations: async function(variation_ids) {
	// 	let ids = variation_ids.split(",").map(Number)
    // 	return await Variation
    //     .findAll({ where: { id: { $in: ids } }})
    //     .then((variations) => {
    //         if (variations.length > 0) {
    //         	let variationData = variations.map( variation => {
	// 				return {
	// 					id: variation.id,
	// 					variation_name: variation.variation_name,
	// 					variation_value: variation.variation_value,
	// 					status: variation.status
	// 				}
	// 			});
	// 			return variationData;
    //         }
    //         else{
    //         	return [];
    //         }
    //     })
    //     .catch((err) => {
    //         throw new Error(err);
    //     });
	// },

	// getProducts: async function(variation_ids) {
	// 	return await Cart.findAll({
	// 		where: { id: {$in: variation_ids}}
	// 	})
	// 	.then( carts => {
	// 		let total_qty = 0;
	// 		let product_items = carts.map( cart => {
	// 			total_qty += cart.qty
	// 			return{
	// 				product_id: cart.product_id,
	//                 variation_id: cart.variation_ids,
	//                 price: cart.price,
	//                 qty: cart.qty
	// 			}

	// 		})
	// 		return ({product_items,total_qty});
	// 	})
	// },

	// updateCartStatus: async function(variation_ids) {

	// 	Cart.update({
	// 		status: "Order Placed"
	// 	}, {
	// 		where: { id: {$in: variation_ids}}
	// 	})
	// },

	// newUser: async function(contact_no) {
	// 	return await User.create({ 
	// 		contact_no: contact_no, status: "Active", last_login: null })
	// 	.then(new_user => {
	// 		if(new_user){
	// 			tokenData = {
	// 				contact_no: contact_no,
	// 				user_id: new_user.id,
	// 				customer_id: null,
	// 				vendor_id: null
	// 			};
	// 			return tokenData
	// 		}
	// 	});
	// },

	// newCustomer: async function(contact_no, vendor_id) {
	// 	return await Customer.create({ 
	// 		mobile_number: contact_no, status: "Active", last_login: null,  user_id: vendor_id  })
	// 	.then(new_customer => {
	// 		if(new_customer){
	// 			tokenData = {
	// 				contact_no: contact_no,
	// 				user_id: null,
	// 				customer_id: new_customer.id,
	// 				vendor_id: vendor_id
	// 			};
	// 			return tokenData
	// 		}
	// 	});
	// },

	// vanishCartByProduct: async function(data) {

	// 	return await Cart.destroy({ 
	// 		where: { status: "Order Pending", product_id: data.product_id }
	// 	})
	// 	.then(carts => {
	// 		return true;
	// 	}).
	// 	catch(err => {
	// 		console.log(err);
	// 	})
	// }
	
}



// const groupBy = key => array =>
//   array.reduce((objectsByKeyValue, obj) => {
//     const value = obj[key];
//     objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
//     return objectsByKeyValue;
//   }, {});





// const productVariations = async function(product_id) {
// 	return await Variation
//     // .findAll({ where: { product_id: product_id, user_id: user_id }})
//     .findAll({ where: { product_id: product_id }})
//     .then((variations) => {
//         if (variations.length > 0) {
//         	let variationData = variations.map( variation => {
// 				return {
// 					id: variation.id,
// 					variation_name: variation.variation_name,
// 					variation_value: variation.variation_value,
// 					status: variation.status
// 				}

// 				// return {
// 				// 	variation_name: variation.variation_name,
// 				// 	variation_value: variation.variation_value,
// 				// }
// 			});
//         	// console.log(variationData)
//         	// const groupByVariationName = groupBy('variation_name');
//         	// var finalVariationData = groupByVariationName(variationData);

//         	// console.log(a)

// 			return variationData;
//         }
//         else{
//         	return [];
//         }
//     })
//     .catch((err) => {
//         throw new Error(err);
//     });
// }