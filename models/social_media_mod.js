
const User_Mod = require('./user_mod');
module.exports = (sequelize, Sequelize) => {
    const Social_Media_Mod = sequelize.define('social_media', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        facebook_name: {
            type: Sequelize.STRING
        },
        insta_name: {
            type: Sequelize.STRING
        },
        youtube_name: {
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

    Social_Media_Mod.belongsTo(User_Mod(sequelize, Sequelize), {
        as: 'user',
        foreignKey: 'user_id'
    });

    return Social_Media_Mod;
}