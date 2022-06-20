module.exports = (sequelize, Sequelize) => {
    const Brand_Mod = sequelize.define('brand', {
        Id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        brand_name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        brand_img_url: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        }
    
    }, { 
        underscored: true, 
        timestamps: true, 
        freezeTableName: true, 
       
    });
    return Brand_Mod;
}