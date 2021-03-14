const express = require('express');
const asyncHandler = require('express-async-handler');

const executionService = require('../service/execution');

const router = express.Router();

router.post('/enter-path', asyncHandler(async (req, res, next) => {
  const executionData = await executionService.executeCleaning(start, commands);
  res.send(executionData);
}));

router.get('/enter-path', asyncHandler(async (req, res, next) => {
  const executions = await executionService.getAllExecutions();
  res.send(executions);
}));

module.exports = router;
