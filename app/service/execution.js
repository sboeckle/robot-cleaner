const Execution = require('../../db/models/execution')

function calculateResult(start, commands) {
  //TBI
  return commands.length
}

async function executeCleaning(start, commands) {
  const startTime = process.hrtime();
  const result = calculateResult(start, commands)
  const duration = parseHrtimeToSeconds(process.hrtime(startTime));
  return addExecution({
    commmands: commands.length, result, duration, timestamp: new Date()
  })
}

function parseHrtimeToSeconds(hrtime) {
  const seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(6);
  return seconds;
}

async function addExecution(data = {
  timestamp,
  commmands,
  result,
  duration
}) {
  const exe = new Execution(data)
  await exe.save();
  return exe.dataValues;
}

async function getAllExecutions() {
  const executions = await Execution.findAll({});
  console.log(executions);
  return executions.map(e => e.dataValues)
}

module.exports = {
  executeCleaning,
  getAllExecutions
}