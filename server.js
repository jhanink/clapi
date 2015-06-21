var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');

var isProduction = process.env.NODE_ENV === 'production';

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
if (!isProduction) {
  var bundle = require('./server/bundle.js');
  bundle();
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

var Routes = require("./routes");
app.use("/", Routes);

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

var port = isProduction ? 8080 : 3000;
app.listen(port, function () {
  console.log('---> Node App Server running on port ' + port);
});