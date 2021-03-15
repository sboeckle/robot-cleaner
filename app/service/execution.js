const Execution = require('../../db/models/execution')

const getFieldsOfPath = (oldField, {direction, steps}) => {
  const fields = [];
  let currentField = {...oldField};
  for (let i = 0; i < steps; i++) {
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
    fields.push(newField)
    currentField = newField
  }
  return fields;
}

function calculateResult(start, commands) {
  const fieldSet = new Set();
  commands.reduce((lastVisitedField, command) => {
    fieldSet.add(`${lastVisitedField.x}${lastVisitedField.y}`)
    const pathFields = getFieldsOfPath(lastVisitedField, command);
    pathFields.forEach(f => fieldSet.add(`${f.x}${f.y}`));
    return pathFields.pop();
  }, {x: start.x, y: start.y})
  return fieldSet.size;
}

async function executeCleaning({start, commands}) {
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
  return executions.map(e => e.dataValues)
}

module.exports = {
  executeCleaning,
  getAllExecutions
}