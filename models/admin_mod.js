module.exports = (sequelize, Sequelize) => {
    const Admin_Mod = sequelize.define('admin', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        contact_no: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        last_login: {
            type: Sequelize.DATE
        },
        email: {
            type: Sequelize.STRING
        },
        user_type: {
            type: Sequelize.STRING
        }     
        
    }, { underscored: true, timestamps: true, freezeTableName: true });
    return Admin_Mod;
}