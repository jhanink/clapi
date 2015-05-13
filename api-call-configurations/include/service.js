var makeRequest = require("./make-request");

var _headers = process.state.headers;
var _options, _data;

var service = {
    setServiceName: function (serviceName) {
      _headers["WM_SVC.NAME"] = serviceName;
    },
    setServiceVersion: function (serviceVersion) {
      _headers["WM_SVC.VERSION"] = serviceVersion;
    },
    setRequestOptions: function (options) {
      _options = options
      _options.headers = _headers;
    },
    setDataPayload: function (data) {
      _data = data;
    },
    setUseHttp: function() {
      process.state.isHttps = false;
    },
    sendRequest: function () {
      makeRequest(_options, _data);
    }

};

module.exports = service;