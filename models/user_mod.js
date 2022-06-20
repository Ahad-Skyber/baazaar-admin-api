const Master_User_Mod = require('./master_user_mod');
const Skyber_Id_Mod = require('./skyber_id_mod');
module.exports = (sequelize, Sequelize) => {
    const User_Mod = sequelize.define('users', {
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
        status: {
            type: Sequelize.STRING
        },
        last_login: {
            type: Sequelize.DATE
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        },
        is_bazar_marketplace: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        }
      
    }, { 
        underscored: true, 
        timestamps: true, 
        freezeTableName: true, 
       
    });


    User_Mod.belongsTo(Master_User_Mod(sequelize, Sequelize), {
        as: 'master_user',
        foreignKey: 'master_user_id'
    });

    User_Mod.belongsTo(Skyber_Id_Mod(sequelize, Sequelize), {
        as: 'skyberid',
        foreignKey: 'skyberid_id'
    });
    return User_Mod;
}