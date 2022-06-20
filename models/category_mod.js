const User_Mod = require('./user_mod');
module.exports = (sequelize, Sequelize) => {
    const Category_Mod = sequelize.define('category', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        category_img_url: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        }
        
    }, 
    { underscored: true, timestamps: true, freezeTableName: true });

    Category_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'User_Mod',
        foreignKey: 'user_id'
    });

    return Category_Mod;
}