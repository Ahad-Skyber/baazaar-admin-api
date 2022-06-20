module.exports = (sequelize, Sequelize) => {
    const State_Mod = sequelize.define('states', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        },
    }, { underscored: true, timestamps: false });

    return State_Mod;
}