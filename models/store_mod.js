const Industry_Mod = require('./industry_mod');
const Category_Mod = require('./category_mod');
const User_Mod = require('./user_mod');
const Category_Type_Mod = require('./category_type_mod');


module.exports = (sequelize, Sequelize) => {
    const Store_Mod = sequelize.define('store', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        store_name: {
            type: Sequelize.STRING
        },
        logo_img: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        allow_store_pickup: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        store_address: {
            type: Sequelize.STRING
        },
        allow_free_shipping: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        shipping_amount: {
            type: Sequelize.DOUBLE
        },
        min_order_amount: {
            type: Sequelize.DOUBLE
        },
        store_bio: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        store_impressions: {
            type: Sequelize.BIGINT,
            defaultValue: 0
        },
        online_status: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },
        store_address_two: {
          type: Sequelize.STRING
        },
        landmark: {
          type: Sequelize.STRING
        },
        country: {
          type: Sequelize.STRING
        },
        country_code: {
          type: Sequelize.STRING
        },
        state: {
          type: Sequelize.STRING
        },
        city: {
          type: Sequelize.STRING
        },
        district: {
          type: Sequelize.STRING
        },
        area_name: {
          type: Sequelize.STRING
        },
        postal_code: {
          type: Sequelize.STRING
        },

        is_poc_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },

        is_qr_pay_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },

        upi: {
            type: Sequelize.STRING
          },

          delivery_radius: {
            type: Sequelize.DOUBLE
          },


        is_marketplace_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },


        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        }


    }, { underscored: true, timestamps: true, freezeTableName: true });

    Store_Mod.belongsTo(Industry_Mod(sequelize, Sequelize), {
        as: 'industry',
        foreignKey: 'industry_id'
    });

    // Store_Mod.belongsTo(Category_Mod(sequelize, Sequelize), {
    //     as: 'category',
    //     foreignKey: 'category_id'
    // });

    Store_Mod.belongsTo(Category_Type_Mod(sequelize, Sequelize), {
        as: 'category_type',
        foreignKey: 'category_type_id'
    });

    Store_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'user',
        foreignKey: 'user_id'
    });

    return Store_Mod;
}