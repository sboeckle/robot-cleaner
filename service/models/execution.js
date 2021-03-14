

module.exports = (sequelize) => {
  const Execution = sequelize.define("execution", {
    timestamp: { type: Sequelize.DATE },
    commmands: { type: Sequelize.STRING },
    result: { type: Sequelize.BOOLEAN },
    duration: { type: Sequelize.DECIMAL }
  });
  return Execution;
};