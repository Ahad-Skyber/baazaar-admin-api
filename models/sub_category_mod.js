const User_Mod = require('./user_mod');
const Category_Mod = require('./category_mod');

module.exports = (sequelize, Sequelize) => {
    const Sub_Category_Mod = sequelize.define('sub_category', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        subcategory_name: {
            type: Sequelize.STRING
        },
        subcategory_img_url: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        }
        
        
    }, { underscored: true, timestamps: true, freezeTableName: true });

    Sub_Category_Mod.belongsTo(Category_Mod(sequelize, Sequelize), {
        as: 'category',
        foreignKey: 'category_id'
    });

    Sub_Category_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'user',
        foreignKey: 'user_id'
    });

    return Sub_Category_Mod;
}