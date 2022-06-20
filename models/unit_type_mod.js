
module.exports = (sequelize, Sequelize) => {
    const Unit_Type_Mod = sequelize.define('unit_type', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        singular_unit: {
            type: Sequelize.STRING
        },
        plural_unit: {
            type: Sequelize.STRING
        },
        front_singular_unit: {
            type: Sequelize.STRING
        },
        front_plural_unit: {
            type: Sequelize.STRING
        },
        is_popular: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
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


    return Unit_Type_Mod;
}