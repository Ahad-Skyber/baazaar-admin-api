module.exports = (sequelize, Sequelize) => {
    const Industry_Mod = sequelize.define('industry', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        industry_name: {
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
        sub_industry_name: {
            type: Sequelize.STRING
        },
        industry_img: {
            type: Sequelize.STRING
        },
        is_popular: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        order: {
            type: Sequelize.BIGINT
        },
        industry_banner: {
            type: Sequelize.STRING
        }

        
    
    }, { 
        underscored: true, 
        timestamps: true, 
        freezeTableName: true, 
       
    });
    return Industry_Mod;
}