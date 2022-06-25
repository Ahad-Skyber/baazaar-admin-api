const Customer_Mod = require('./customer_mod');
const State_Mod = require('./state_mod');
const City_Mod = require('./city_mod');

module.exports = (sequelize, Sequelize) => {
    const CustomerAddress_Mod = sequelize.define('customer_address', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        full_name:{
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
        is_default_address: {
            type: Sequelize.BOOLEAN
        },
        
        contact_no: {
           type: Sequelize.STRING 
        },

        house_flat_block_no: {
            type: Sequelize.STRING 
         },
         landmark: {
            type: Sequelize.STRING 
         },
         geo_location_address: {
            type: Sequelize.STRING 
         },

         latitude: {
            type: Sequelize.STRING 
         },
         longitude: {
            type: Sequelize.STRING 
         }

        
        
    }, { underscored: true, timestamps: true, freezeTableName: true });

    CustomerAddress_Mod.belongsTo(Customer_Mod(sequelize, Sequelize), {
        as: 'customer',
        foreignKey: 'customer_id'
    });

    CustomerAddress_Mod.belongsTo(State_Mod(sequelize, Sequelize), {
        as: 'state',
        foreignKey: 'state_id'
    });

    CustomerAddress_Mod.belongsTo(City_Mod(sequelize, Sequelize), {
        as: 'city',
        foreignKey: 'city_id'
    });

    return CustomerAddress_Mod;
}