const Sequelize = require('sequelize');
const db = require('./dbConfig');
const Op = Sequelize.Op;

const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    dialectOptions: {
        options: {
         
          trustServerCertificate: true
        }, 
      },
    pool: {
        max: db.pool.max,
        min: db.pool.minmin,
        acquire: db.pool.acquire,
        idle: db.pool.idle
    },
    define: {
        timestamps: db.define.timestamps
    },

});

sequelize.authenticate()
.then(()=>{
console.log("Connected");
})
.catch(err=>{
    console.log("error"+err);
});


const models = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    brand_mod: require('../models/brand_mod')(sequelize, Sequelize), 
    industry_mod: require('../models/industry_mod')(sequelize, Sequelize), 
    category_mod: require('../models/category_mod')(sequelize, Sequelize), 
    category_type_mod: require('../models/category_type_mod')(sequelize, Sequelize), 
    sub_category_mod: require('../models/sub_category_mod')(sequelize, Sequelize), 
    child_category_mod: require('../models/child_category_mod')(sequelize, Sequelize), 
    unit_type_mod: require('../models/unit_type_mod')(sequelize, Sequelize), 
    coupon_mod: require('../models/coupon_mod')(sequelize, Sequelize), 
    admin_mod: require('../models/admin_mod')(sequelize, Sequelize), 

    master_user_mod: require('../models/master_user_mod')(sequelize, Sequelize), 
    skyber_id_mod: require('../models/skyber_id_mod')(sequelize, Sequelize), 
    user_mod: require('../models/user_mod')(sequelize, Sequelize), 
    state_mod: require('../models/state_mod')(sequelize, Sequelize), 
    city_mod: require('../models/city_mod')(sequelize, Sequelize), 
    customer_mod: require('../models/customer_mod')(sequelize, Sequelize), 
    customer_address_mod: require('../models/customer_address_mod')(sequelize, Sequelize), 
    order_mod: require('../models/order_mod')(sequelize, Sequelize), 
    waitlist_mod: require('../models/waitlist_mod')(sequelize, Sequelize), 
    
    product_mod: require('../models/product_mod')(sequelize, Sequelize), 
    variation_mod: require('../models/variation_mod')(sequelize, Sequelize), 
    variable_product_mod: require('../models/variable_product_mod')(sequelize, Sequelize), 
    order_details_mod: require('../models/order_details_mod')(sequelize, Sequelize), 
    store_mod: require('../models/store_mod')(sequelize, Sequelize),
    kyc_mod: require('../models/kyc_mod')(sequelize, Sequelize),

    social_media_mod: require('../models/social_media_mod')(sequelize, Sequelize),

    company_details_mod: require('../models/company_details_mod')(sequelize, Sequelize),
    
    company_coupons_mod: require('../models/company_coupons_mod')(sequelize, Sequelize),
};

console.log('print admin models')
console.log(models);

const DB={};

DB.Sequelize= Sequelize;
DB.sequelize=sequelize;

module.exports = {models, DB};




