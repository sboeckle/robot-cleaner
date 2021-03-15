
const Sequelize = require('sequelize');
const sequelize = require('../index').getConnection()

const Execution = sequelize.define("execution", {
  timestamp: { type: Sequelize.DATE },
  commands: { type: Sequelize.NUMBER },
  result: { type: Sequelize.NUMBER },
  duration: { type: Sequelize.DECIMAL }
}, {timestamps: false});

module.exports = Execution