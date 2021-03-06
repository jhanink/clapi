var makeRequest = require("./make-request");

module.exports = function(state) {
  var _headers = state.headers;
  var _options, _data;

  return {
    clearHeaders: function () {
      _headers = {};
    },
    setHeader: function (name, value) {
      _headers[name] = value;
    },
    setServiceName: function (serviceName) {
      this.setHeader("WM_SVC.NAME", serviceName);
    },
    setServiceVersion: function (serviceVersion) {
      this.setHeader("WM_SVC.VERSION", serviceVersion);
    },
    setServiceEnv: function (serviceEnv) {
      this.setHeader("WM_SVC.ENV", serviceEnv)
    },
    setConsumerId: function (consumerId) {
      this.setHeader("WM_CONSUMER.ID", consumerId);
    },
    setTenantId: function (tenantId) {
      this.setHeader("WM_TENANT_ID", tenantId);
    },
    setVerticalId: function (verticalId) {
      this.setHeader("WM_VERTICAL_ID", verticalId);
    },
    setLocaleId: function (localeId) {
      this.setHeader("WM_LOCALE_ID", localeId);
    },
    setKeyVersion: function (keyVersion) {
      this.setHeader("WM_SEC.KEY_VERSION", keyVersion);
    },
    setConsumerUserId: function (consumerUserId) {
      this.setHeader("WM_CONSUMER.USER_ID", consumerUserId);
    },
    setAuthSignature: function (signature) {
      this.setHeader("WM_SEC.AUTH_SIGNATURE", signature);
    },
    setCorrelationId: function (correlationId) {
      this.setHeader("WM_QOS.CORRELATION_ID", correlationId);
    },
    setRequestOptions: function (options) {
      _options = options;
      _options.headers = _headers;
    },
    deleteHeader: function (header) {
      delete _options.headers[header];
    },
    setDataPayload: function (data) {
      _data = data;
    },
    sendRequest: function (options, data) {
      if (options) this.setRequestOptions(options);
      if (data) this.setDataPayload(data);
      makeRequest(_options, _data, state);
    },
    getHeaders: function () {
      return _headers;
    },
    logHeaders: function () {
      var fs = require('fs');
      fs.writeFile("/tmp/clapiHeaders.json", JSON.stringify(_headers), function(err) {
      })
    }
  }
};
