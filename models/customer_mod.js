const User_Mod = require('./user_mod');
const State_Mod = require('./state_mod');
const City_Mod = require('./city_mod');
const Master_User_Mod = require('./master_user_mod');
const Skyber_Id_Mod = require('./skyber_id_mod');
const master_user_mod = require('./master_user_mod');
module.exports = (sequelize, Sequelize) => {
    const Customer_Mod = sequelize.define('customer', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        customer_name: {
            type: Sequelize.STRING
        },
        user_name: {
            type: Sequelize.STRING
        },
        mobile_number: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DOUBLE
        },
        amount_type: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        flat_no: {
            type: Sequelize.STRING
        },
        apartment_name: {
            type: Sequelize.STRING
        },
        road_name: {
            type: Sequelize.STRING
        },
        pincode: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        is_manual: {
            type: Sequelize.STRING
        },
        last_login: {
            type: Sequelize.DATE
        },
        profile_name: {
            type: Sequelize.STRING
        },
        business_name: {
            type: Sequelize.STRING
        },
        customer_img: {
            type: Sequelize.STRING
        },
        master_user_id: {
            type: Sequelize.STRING
        }


    }, { underscored: true, timestamps: true, freezeTableName: true });
    
   
    Customer_Mod.belongsTo(Master_User_Mod(sequelize, Sequelize), {
        as: 'master_user',
        foreignKey: 'master_user_id'
    });

    Customer_Mod.belongsTo(Skyber_Id_Mod(sequelize, Sequelize), {
        as: 'skyberid',
        foreignKey: 'skyberid_id'
    });

    Customer_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'user',
        foreignKey: 'user_id'
    });

    Customer_Mod.belongsTo(State_Mod(sequelize, Sequelize), {
        as: 'state',
        foreignKey: 'state_id'
    });

    Customer_Mod.belongsTo(City_Mod(sequelize, Sequelize), {
        as: 'city',
        foreignKey: 'city_id'
    });

    return Customer_Mod;
}