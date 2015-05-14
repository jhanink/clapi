module.exports = function (state) {

  var headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "WM_SVC.VERSION": "2.0.0",
    "WM_SVC.ENV": "prod",
    "WM_CONSUMER.IP": "172.29.175.171",
    "WM_QOS.CORRELATION_ID": "d1f0c0d2-2cf4-497b-b630-06d609d987b0",
    "WM_TENANT_ID": 0,
    "WM_VERTICAL_ID": 0,
    "WM_CONSUMER.USER_ID": "6d05a765-6e16-424f-bfc0-cbafe173a8ce",
    "WM_LOCALE_ID": "eng_USA",
    "WM_DEVICE_ID": 123,
    "DEVICE_TYPE": "browser",
    "USER_AGENT": "Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20120403211507 Firefox/12.0",
    "DEVICE_LANGUAGE": "eng_USA",
    "DEVICE_OS": "MAC OSX Lion",
    "DEVICE_TZ": "2012-04-25T12:00:00",
    "WM_TEST_MODE": "Y",
    "WM_CONSUMER.ID": "6d05a765-6e16-424f-bfc0-cbafe173a8ce",
    "WM_CONSUMER.INTIMESTAMP": "1424391634200",
    "WM_SEC.AUTH_SIGNATURE": "QL09qh8NJXSc35iqAdeo9HzqZhJkN9z91JdvANgD80w/P0pEyXqwqdFLGzkNfEmaCEDV+2BVxQAafJp1TPIbMOmxMlbGmwlzC4+ZKRNVrrndR7W/gTb49tHcKxHpzCpvsQ646AjorzPGV6/ztEMJjLGLHN6K0ORg0B5nF+5Ctzo=",
    "WM_SEC.KEY_VERSION": 1,
    "WM_SEC.AUTH_TOKEN": "+D9JPGO0HLIKVmOO8pQIk3WaspcXzJaR/Nw6LJq3G5Xd4z7dTDlCgJm+iDbdVObnjfcFq6Ca921hYGojvn7ILS0I2VfsZ3MmMPGgVLqHLquvj6r71UHfTW8ANTF2+iu9OcIyGmWOkffXIkpp1XrVfvuoDe6MXXtW68aj49YyJgQgAc8f3FcUPMn9a4kSmRrH1dGbu1Vzn7sy6VYesNlQ4Q==",
    "WM_CONSUMER.USER_TYPE": "GUEST"
  };

  state.headers = headers;

  require("./" + state.args.name)(state);
};
