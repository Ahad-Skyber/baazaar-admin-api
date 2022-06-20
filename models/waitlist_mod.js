const Customer_Mod = require('./customer_mod');
module.exports = (sequelize, Sequelize) => {
    const Waitlist_Mod = sequelize.define('waitlist', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        referral_code: {
            type: Sequelize.STRING
        },
        used_referral_count: {
            type: Sequelize.BIGINT
        },
        rank: {
            type: Sequelize.BIGINT
        },
        another_user_referral_code: {
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

    Waitlist_Mod.belongsTo(Customer_Mod(sequelize, Sequelize), {
        as: 'customer',
        foreignKey: 'customer_id'
    });

    return Waitlist_Mod;
}