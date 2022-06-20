

const User_Mod = require('./user_mod');
//const Category = require('./category');
const Variation_Mod = require('./variation_mod');
//const UnitType = require('./unitType');
//const SubCategory = require('./subCategory');
const Product_Mod = require('./product_mod');


module.exports = (sequelize, Sequelize) => {
    const Variable_Product_Mod = sequelize.define('variable_product', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        mrp: {
            type: Sequelize.DOUBLE
        },
        selling_price: {
            type: Sequelize.DOUBLE
        },
        product_img_url: {
            type: Sequelize.STRING
        },
        product_img_url_2: {
            type: Sequelize.STRING
        },
        product_img_url_3: {
            type: Sequelize.STRING
        },
        product_img_url_4: {
            type: Sequelize.STRING
        },
        product_img_url_5: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        stock_status: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },
        barcode: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.BIGINT
        },
        
        
        
    }, { underscored: true, timestamps: true, freezeTableName: true });

    Variable_Product_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'user',
        foreignKey: 'user_id'
    });


    Variable_Product_Mod.belongsTo(Product_Mod(sequelize, Sequelize), {
        as: 'product',
        foreignKey: 'product_id'
    });

    Variable_Product_Mod.belongsTo(Variation_Mod(sequelize, Sequelize), {
        as: 'variation_1',
        foreignKey: 'variation_1_id'
    });

    Variable_Product_Mod.belongsTo(Variation_Mod(sequelize, Sequelize), {
        as: 'variation_2',
        foreignKey: 'variation_2_id'
    });

    return Variable_Product_Mod;
}