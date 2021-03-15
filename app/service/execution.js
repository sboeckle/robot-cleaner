const Execution = require('../../db/models/execution')

const _getNextField = (currentField, direction) => {
    let newField = {...currentField};
    switch (direction) {
      case 'north':
        newField.y = newField.y + 1
        break;
      case 'south':
        newField.y = newField.y - 1
        break;
      case 'east':
        newField.x = newField.x + 1
        break;
      case 'west':
        newField.x = newField.x - 1
        break;
      default:
        break;
    }
    return newField;
}

function _calculateResult(start, commands) {
  const fieldSet = new Set();
  let currentField = {...start}
  fieldSet.add(`${currentField.x}${currentField.y}`)
  for (let i = 0; i < commands.length; i++) {
    const {direction, steps} = commands[i];
    for (let j = 0; j < steps; j++) {
      currentField = _getNextField(currentField, direction);
      fieldSet.add(`${currentField.x}${currentField.y}`)
    }
  }
  return fieldSet.size;
}

function _parseHrtimeToSeconds(hrtime) {
  const seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(6);
  return seconds;
}

async function executeCleaning({start, commands}) {
  const startTime = process.hrtime();
  const result = _calculateResult(start, commands)
  const duration = _parseHrtimeToSeconds(process.hrtime(startTime));
  return addExecution({
    commmands: commands.length, result, duration, timestamp: new Date()
  })
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
  return executions.map(e => e.dataValues)
}

module.exports = {
  executeCleaning,
  getAllExecutions
}