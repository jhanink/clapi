var makeRequest = require("./make-request");

module.exports = function(state) {
  var _headers = state.headers;
  var _options, _data;

  return {
    setHeader: function (name, value) {
      _headers[name] = value;
    },
    setServiceName: function (serviceName) {
      this.setHeader("WM_SVC.NAME", serviceName);
    },
    setServiceVersion: function (serviceVersion) {
      this.setHeader("WM_SVC.VERSION", serviceVersion);
    },
    setConsumerId: function (consumerId) {
      this.setHeader("WM_CONSUMER.ID", consumerId);
    },
    setRequestOptions: function (options) {
      _options = options;
      _options.headers = _headers;
    },
    setDataPayload: function (data) {
      _data = data;
    },
    sendRequest: function (options, data) {
      if (options) this.setRequestOptions(options);
      if (data) this.setDataPayload(data);
      makeRequest(_options, _data, state);
    }
  }
};
