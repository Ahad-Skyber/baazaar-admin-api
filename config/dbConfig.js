const dbConfig = {
    // database: 'dhanda_test',
    database: 'dhanda_dev',
    username: 'admin',
    password: 'Skills1234',
    dialect: 'mssql',
    host: 'skyber-prod.cbnjzu383wpg.ap-south-1.rds.amazonaws.com',
    port: 1433,
    pool: {
    max: 5,
    min: 0,
    acquire: 10000*10000,
    idle: 10000
    },
    define:{
    timestamps:false
    },


  };
  
  module.exports = dbConfig;


