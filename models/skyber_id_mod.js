const Master_User_Mod = require('./master_user_mod');
module.exports = (sequelize, Sequelize) => {
    const Skyber_Id_Mod = sequelize.define('skyberid', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: Sequelize.STRING
        },
        contact_no: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        is_vendor: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        is_customer: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        
    }, { underscored: true, timestamps: true });

    Skyber_Id_Mod.belongsTo(Master_User_Mod(sequelize, Sequelize), {
        as: 'master_user',
        foreignKey: 'master_user_id'
    });


    return Skyber_Id_Mod;
}