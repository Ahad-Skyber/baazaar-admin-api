const User_Mod = require('./user_mod');
const Category_Mod = require('./category_mod');
const Sub_Category_Mod = require('./sub_category_mod');
const Industry_Mod = require('./industry_mod');

module.exports = (sequelize, Sequelize) => {
    const Child_Category_Mod = sequelize.define('child_category', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        childcategory_name: {
            type: Sequelize.STRING
        },
        childcategory_img_url: {
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

    Child_Category_Mod.belongsTo(Category_Mod(sequelize, Sequelize), {
        as: 'category',
        foreignKey: 'category_id'
    });

   

    Child_Category_Mod.belongsTo(Industry_Mod(sequelize, Sequelize), {
        as: 'industry',
        foreignKey: 'industry_id'
    });

    Child_Category_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'user',
        foreignKey: 'user_id'
    });

    Child_Category_Mod.belongsTo(Sub_Category_Mod(sequelize, Sequelize), {
        as: 'sub_category',
        foreignKey: 'sub_category_id'
    });

    return Child_Category_Mod;
}