
const Sequelize = require('sequelize');
const sequelize = require('../index').getConnection()

const Execution = sequelize.define("execution", {
  timestamp: { type: Sequelize.DATE },
  commmands: { type: Sequelize.STRING },
  result: { type: Sequelize.BOOLEAN },
  duration: { type: Sequelize.DECIMAL }
}, {timestamps: false});

module.exports = Execution