let express = require('express');
let path = require('path');
let httpProxy = require('http-proxy');

let app = express();
let proxy = httpProxy.createProxyServer();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? 8080 : 3000;

app.set('view engine', 'ejs');

// NOTE: route handler order matters

// -- handle /build/*
if (!isProduction) {
  let bundleDev = require('./server/bundle.js');
  bundleDev();
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

// -- handle public path
app.use(express.static(path.resolve(__dirname, 'public')));

// -- handle /favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
});

// -- handle custom routes
let Routes = require("./routes");
app.use("/", Routes);

proxy.on('error', (e) => {
  console.log('Could not connect to proxy, please try again...', e);
});

app.listen(port, () => {
  console.log('---> Node App Server running on port ' + port);
});