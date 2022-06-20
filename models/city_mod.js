const State_Mod = require('./state_mod');
module.exports = (sequelize, Sequelize) => {
    const City_Mod = sequelize.define('city', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
    }, { underscored: true, timestamps: false });

    City_Mod.belongsTo(State_Mod(sequelize, Sequelize), {
        as: 'State',
        foreignKey: 'state_id'
    });
    
    return City_Mod;
}