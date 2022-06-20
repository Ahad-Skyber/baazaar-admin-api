const express=require('express');
const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');

const readXlsxFile = require("read-excel-file/node");


const Company_Details_Mod = models.company_details_mod;
const Company_Coupons_Mod = models.company_coupons_mod;
const { Op } = require('sequelize');

global.__basedir = __dirname + "/..";

module.exports = {

    company_details_list: (req, res, next) => {
    Company_Details_Mod.findAll({

        order: [
            ['id', 'DESC']
        ]

    })
		.then(companies => {
			if(companies.length > 0){
				res.status(200).send({ message: 'Companies list!', data: companies, err: null });
			}
			else{
				res.status(404).send({ message: 'No companies found!', data: null, err: null });
			}
		}).catch(err => {
			console.log(err)
		})

	},


    company_coupon_list: (req, res, next) => {
        Company_Coupons_Mod.findAll({
            where: { 
                company_detail_id:req.body.company_detail_id       
               },
            order: [
                ['id', 'DESC']
            ]
        })
            .then(coupons => {
                if(coupons.length > 0){
                    res.status(200).send({ message: 'Coupons list!', data: coupons, err: null });
                }
                else{
                    res.status(404).send({ message: 'No coupons found!', data: null, err: null });
                }
            }).catch(err => {
                console.log(err)
            })
    
        },

        upload :(req, res,next) => {
            try {
              if (req.file == undefined) {
                return res.status(400).send("Please upload an excel file!");
              }
              let path =  __basedir + "/resources/static/uploads/" + req.file.filename;

              
              readXlsxFile(path).then((rows) => {
                // skip header
                rows.shift();
                let coups = [];
                rows.forEach((row) => {
                  let coup = {
                    company_detail_id: req.body.company_detail_id,
                    coupon_code: row[0],
                        
                  };
                  coups.push(coup);
                });
                Company_Coupons_Mod.bulkCreate(coups)
                  .then(() => {
                    res.status(200).send({
                      message: "Uploaded the file successfully: " + req.file.originalname,
                    });
                  })
                  .catch((error) => {
                    res.status(500).send({
                      message: "Fail to import data into database!",
                      error: error.message,
                    });
                  });
              });
            } catch (error) {
              console.log(error);
              res.status(500).send({
                message: "Could not upload the file: " + req.file.originalname,
              });
            }
          },


   
}
