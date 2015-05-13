var serviceHeaders = function (headers) {

  return {

    setServiceEnv: function (envName) {
      headers["WM_SVC.NAME"] = envName;
    }
  };
};

module.exports = serviceHeaders;