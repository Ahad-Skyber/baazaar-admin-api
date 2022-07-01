const { DATE, and } = require('sequelize');
const { response } = require('../app');
const {models, DB} = require('../config/seqConfig');
const Store_Mod = models.store_mod;
const { Op } = require('sequelize');

module.exports = {


	store_list: (req, res, next) => {  
        Store_Mod.findAll({
          order: [
            ['store_name', 'ASC']
        ]
        }).then(async stors => {
          if(!stors ||stors.length == 0)
            return res.send(404).send({ message: 'Stors not found!', data: null, err: null });
            let response = [];   
           
            for(let store of stors){     
              const data = {
                id:store.id,
				user_id:store.user_id,
				logo_img:store.logo_img,
                store_name: store.store_name,    
                status:store.status,
				m_p_s: store.is_marketplace_active == true ? 'Yes' :store.is_marketplace_active == false ? 'No' :store.is_marketplace_active,
              }
             
              response.push(data);
            }
    
            return res.status(200).json({
                message: "Stors!",
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

	  store_list_by_store_name: (req, res, next) => {  
        Store_Mod.findAll({
			where: { 
				store_name: { [Op.like]: `%${req.body.store_name}%` }
			
			 }
        
        }).then(async stors => {
          if(!stors ||stors.length == 0)
            return res.send(404).send({ message: 'Stors not found!', data: null, err: null });
            let response = [];   
           
            for(let store of stors){     
              const data = {
                id:store.id,
				user_id:store.user_id,
				logo_img:store.logo_img,
                store_name: store.store_name,    
                status:store.status,
				m_p_s: store.is_marketplace_active == true ? 'Yes' :store.is_marketplace_active == false ? 'No' :store.is_marketplace_active,
              }
             
              response.push(data);
            }
    
            return res.status(200).json({
                message: "Stors!",
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




}
