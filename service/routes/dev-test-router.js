var express = require('express');
var router = express.Router();

const asyncHandler = require('express-async-handler');

router.post('/enter-path', asyncHandler(async (req, res, next) => {
  res.send('respond with a resource');
}));

router.get('/enter-path', asyncHandler(async (req, res, next) => {
  console.log('request')
  res.send('respond with a resource');
}));

module.exports = router;
