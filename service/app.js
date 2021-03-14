const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const devTestRouter = require('./routes/dev-test-router');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tibber-developer-test', devTestRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404')
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
