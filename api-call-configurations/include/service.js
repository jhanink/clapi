var makeRequest = require("./make-request");

var _headers = process.state.headers;
var _options, _data;

var service = {
    setHeader: function (name, value) {
      _headers[name] = value;
    },
    setServiceName: function (serviceName) {
      this.setHeader("WM_SVC.NAME", serviceName);
    },
    setServiceVersion: function (serviceVersion) {
      this.setHeader("WM_SVC.VERSION", serviceVersion);
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
    sendRequest: function (options, data) {
      if (options) this.setRequestOptions(options);
      if (data) this.setDataPayload(data);
      makeRequest(_options, _data);
    }

};

module.exports = service;