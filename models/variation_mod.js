const User_Mod = require('./user_mod');
const Product_Mod = require('./product_mod') ;

module.exports = (sequelize, Sequelize) => {
    const Variation_Mod = sequelize.define('variation', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        variation_no: {
            type: Sequelize.INTEGER
        },
        variation_name: {
            type: Sequelize.STRING
        },
        variation_value: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        
        
    }, { underscored: true, timestamps: true, freezeTableName: true });

    Variation_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'user',
        foreignKey: 'user_id'
    });


    // Variation_Mod.belongsTo(Product_Mod(sequelize, Sequelize), {
    //     as: 'product',
    //     foreignKey: 'product_id'
    // });

    return Variation_Mod;
}