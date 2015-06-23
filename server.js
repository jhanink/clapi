let express = require('express');
let path = require('path');
let app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? 8080 : 3000;

let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();

if (!isProduction) {
  let bundle = require('./server/bundle.js');
  bundle();
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

app.get('/favicon.ico', (req, res) => {
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
});

let Routes = require("./routes");
app.use("/", Routes);

proxy.on('error', (e) => {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, () => {
  console.log('---> Node App Server running on port ' + port);
});