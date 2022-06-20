const User_Mod = require('./user_mod');
const Category_Mod = require('./category_mod');
//const Variation = require('./variation');
const Unit_Type_Mod = require('./unit_type_mod');
const Sub_Category_Mod = require('./sub_category_mod');
const Child_Category_Mod = require('./child_category_mod');
const Brand_Mod = require('./brand_mod');
const Country_Mod = require('./country_mod');

module.exports = (sequelize, Sequelize) => {
    const Product_Mod = sequelize.define('product', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: Sequelize.STRING
        },
        product_description: {
            type: Sequelize.STRING
        },
        product_keywords: {
            type: Sequelize.STRING
        },
        mrp: {
            type: Sequelize.DOUBLE
        },
        selling_price: {
            type: Sequelize.DOUBLE
        },
        discount: {
            type: Sequelize.DOUBLE
        },
        per_proportion: {
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
        product_type: {
            type: Sequelize.STRING
        },
        item_type: {
            type: Sequelize.STRING
        },
        // gst: {
        //     type: Sequelize.INTEGER
        // },
        // hsn_code: {
        //     type: Sequelize.STRING
        // },
        condition: {
            type: Sequelize.STRING
        },
        barcode: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.BIGINT
        },
        
        
    }, { underscored: true, timestamps: true, freezeTableName: true });


    Product_Mod.belongsTo(Category_Mod(sequelize, Sequelize), {
        as: 'category',
        foreignKey: 'category_id'
    });

    Product_Mod.belongsTo(Sub_Category_Mod(sequelize, Sequelize), {
        as: 'sub_category',
        foreignKey: 'sub_category_id'
    });

    Product_Mod.belongsTo(Child_Category_Mod(sequelize, Sequelize), {
        as: 'child_category',
        foreignKey: 'child_category_id'
    });


    Product_Mod.belongsTo(Unit_Type_Mod(sequelize, Sequelize), {
        as: 'unit_type',
        foreignKey: 'unit_type_id'
    });

    Product_Mod.belongsTo(Brand_Mod(sequelize, Sequelize), {
        as: 'brand',
        foreignKey: 'brand_id'
    });

    Product_Mod.belongsTo(Country_Mod(sequelize, Sequelize), {
        as: 'country',
        foreignKey: 'country_id'
    });

    Product_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'user',
        foreignKey: 'user_id'
    });


    return Product_Mod;
}