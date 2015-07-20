module.exports = function (state) {
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
    "WM_SVC.VERSION": "1.0.0",
    "WM_DEVICE_ID": "01",
    "DEVICE_TYPE": "browser",
    "DEVICE_TZ": "2012-04-25T12:00:00",
    "WM_IFX.CLIENT_TYPE": "Java",
    "WM_SEC.AUTH_TOKEN": "ahha%&!^!)(!&",
    "USER_AGENT": "Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20120403211507 Firefox/12.0",
    "WM_CONSUMER.INTIMESTAMP": "1436824998496"
  };

  state.headers = headers;

  require("./" + state.args.name)(state);
};
