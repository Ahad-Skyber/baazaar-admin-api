module.exports = (sequelize, Sequelize) => {
  const Master_User_Mod = sequelize.define('master_user', {
      id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
      },
      full_name: {
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
      created_at: {
        type: Sequelize.DATE
    },
    updated_at: {
        type: Sequelize.DATE
    }
      
  }, { underscored: true, timestamps: true });


  return Master_User_Mod;
}