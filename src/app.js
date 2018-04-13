const path = require('path');
const express = require('express');

const indexRouter = require('./routes/index');
const branchesRouter = require('./routes/branches');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/branches', branchesRouter);

module.exports = app;