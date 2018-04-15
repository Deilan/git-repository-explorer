const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const branchesRouter = require('./routes/branches');
const treeRouter = require('./routes/tree');
const commitsRouter = require('./routes/commits');

const urlJoin = require('url-join');
const { getParentUrl } = require('./utils/url');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
  req.getParentUrl = () => req.parentUrl || getParentUrl(req.originalUrl) || '/';
  req.getChildUrl = (path) => urlJoin(req.originalUrl, path);
  next();
});

app.use('/', indexRouter);
app.use('/branches', branchesRouter);
app.use('/tree', treeRouter);
app.use('/commits', commitsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
