const Sequelize = require('sequelize');
let sequelize;

function getConnection (config) {
  if (sequelize) return sequelize;
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
    }
  );
  return sequelize;
}

module.exports = {
  getConnection
};