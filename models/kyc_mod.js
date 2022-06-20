const Master_User_Mod = require('./master_user_mod');
module.exports = (sequelize, Sequelize) => {
    const Kyc_Mod = sequelize.define('kyc', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        entity_type: {
            type: Sequelize.STRING
        },

        is_adhar_verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        is_pan_verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        is_gst_verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        },
        adhar_created: {
            type: Sequelize.DATE
        },
        pan_created: {
            type: Sequelize.DATE
        },
        gst_created: {
            type: Sequelize.DATE
        },
        
    }, 
    { underscored: true, timestamps: true, freezeTableName: true });

    Kyc_Mod.belongsTo(Master_User_Mod(sequelize, Sequelize), {
        as: 'master_user',
        foreignKey: 'master_user_id'
    });

    return Kyc_Mod;
}