const Execution = require('../../db/models/execution')

/**
 * mapper of calculating a new field by taking one step in a direction from a given field
 */
const _oneStep = {
  'north': ({x,y}) => ({y: ++y, x}),
  'south': ({x,y}) => ({y: --y, x}),
  'east': ({x,y}) => ({y, x: ++x}),
  'west': ({x,y}) => ({y, x: --x}),
}

function _calculateResult(start, commands) {
  const uniqueFields = new Set();
  let currentField = {...start}
  for (let i = 0; i < commands.length; i++) {
    const {direction, steps} = commands[i];
    for (let j = 0; j < steps; j++) {
      currentField = _oneStep[direction](currentField);
      uniqueFields.add(`${currentField.x}${currentField.y}`)
    }
  }
  return uniqueFields.size;
}

function _parseHrtimeToSeconds(hrtime) {
  const seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(6);
  return seconds;
}

async function _saveExecution(data = {
  timestamp,
  commands,
  result,
  duration
}) {
  const exe = new Execution(data)
  await exe.save();
  return exe.dataValues;
}

/**
 * executes cleaning
 * @param {Object} object containing start and commands
 * @returns {Promise<Object>} Execution models data values
 * @see Execution
 */
async function executeCleaning({start, commands = []}) {
  const startTime = process.hrtime();
  const result = _calculateResult(start, commands)
  const duration = _parseHrtimeToSeconds(process.hrtime(startTime));
  return _saveExecution({
    timestamp: new Date(), commands: commands.length, result, duration
  })
}

/**
 * fetches all executions from database
 * @returns {Promise<Array.<Object>>} array of executions
 * @see Execution
 */
async function getAllExecutions() {
  const executions = await Execution.findAll({});
  return executions.map(e => e.dataValues)
}

module.exports = {
  executeCleaning,
  getAllExecutions
}