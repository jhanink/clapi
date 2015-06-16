var express = require('express');
var path = require('path');

var routes = require('./routes/index');

var app = express();
app.set('views', __dirname + '/build');
app.engine('html', require('ejs').renderFile);
app.engine('js', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;