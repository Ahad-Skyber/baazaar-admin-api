module.exports = (sequelize, Sequelize) => {
    const Company_Details_Mod = sequelize.define('company_details', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: Sequelize.STRING
        },
        company_name: {
            type: Sequelize.STRING
        },
        company_logo_img: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        },

        company_website: {
            type: Sequelize.STRING
        },
        terms_condition: {
            type: Sequelize.STRING
        },
        redemption: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
            
    }, { underscored: true, timestamps: true });
  
  
    return Company_Details_Mod;
  }