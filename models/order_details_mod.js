const Order_Mod = require('./order_mod');
const Product_Mod = require('./product_mod');
const Variable_Product_Mod = require('./variable_product_mod');
const User_Mod = require('./user_mod');
const Customer_Mod = require('./customer_mod');

module.exports = (sequelize, Sequelize) => {
    const Order_Details_Mod = sequelize.define('order_items', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: Sequelize.DOUBLE
        },
        qty: {
            type: Sequelize.STRING
        },
        variation_ids: {
            type: Sequelize.STRING
        },
        gst_amount: {
            type: Sequelize.DOUBLE
        }
      
        
    }, { underscored: true, timestamps: true, freezeTableName: true });

    Order_Details_Mod.belongsTo(Order_Mod(sequelize, Sequelize), {
        as: 'order',
        foreignKey: 'order_id'
    });

    Order_Details_Mod.belongsTo(Product_Mod(sequelize, Sequelize), {
        as: 'product',
        foreignKey: 'product_id'
    });

    Order_Details_Mod.belongsTo(Variable_Product_Mod(sequelize, Sequelize), {
        as: 'variable_product',
        foreignKey: 'variable_product_id'
    });

    Order_Details_Mod.belongsTo(Customer_Mod(sequelize, Sequelize), {
        as: 'customer',
        foreignKey: 'customer_id'
    });

    Order_Details_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'user',
        foreignKey: 'user_id'
    });

    return Order_Details_Mod;
}