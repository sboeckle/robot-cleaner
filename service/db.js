const Sequelize = require('sequelize');
const defaultConfig = require('../config').db
let sequelize;

function connect (config = defaultConfig) {
  console.log('connecting');
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
    }
  );
  return sequelize
}

module.exports = {
  connect
}