
module.exports = function () {

  var headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "WM.SRV.DEVICEID": "walmart.com",
    "WM.SRV.LOCALEID": "eng_USA",
    "WM.SRV.TENANTID": 0,
    "WM_CONSUMER.ID": 100,
    "WM_QOS.CORRELATION_ID": "bfhyb",
    "WM_SEC.AUTH_TOKEN": "ahha%&!^!)(!&",
    "WM_SVC.ENV": "stage",
    "WM_SVC.VERSION": "1.0.0"
  };

  process.state.headers = headers;

  require("./" + process.state.args.name)();
};
