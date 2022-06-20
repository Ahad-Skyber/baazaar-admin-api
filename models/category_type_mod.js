
module.exports = (sequelize, Sequelize) => {
    const Category_Type_Mod = sequelize.define('category_type', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        category_type_name: {
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
        },
        category_type_img: {
            type: Sequelize.STRING
        }
        
        
        
    }, { underscored: true, timestamps: true, freezeTableName: true });


    return Category_Type_Mod;
}