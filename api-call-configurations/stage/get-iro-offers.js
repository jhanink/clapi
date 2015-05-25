
module.exports = function (state) {
  var service = require("../include/service")(state);
  var id = state.args.id;
  if (!id) {
    console.log("---> missing (item or offer) id");return;
  }

  var options = {
    url: 'http://iro-webapp.stg0.iro.services.glb.prod.walmart.com/item-read-service/productOffers?rgs=PRODUCT_CONTENT,PRODUCT_ASSET,OFFER_PRODUCT,OFFER_PRICE,OFFER_INVENTORY',
    method: 'POST'
  };

  var data = {
    "offerContexts" : [
      {
        "offerId" : {}
      }
    ],
    "postalAddress": {
      "isApoFpo": false,
      "isPoBox": false,
      "city": "APO",
      "stateOrProvinceCode": "AP",
      "postalCode": "96213",
      "countryCode": "USA"
    },
    "storeFrontIds": [
      {
        "USStoreId": 2280
      }
    ]
  };



  if (id.length === 32) {
    data.offerContexts[0].offerId.offerId = id;
  } else {
    data.offerContexts[0].offerId.USItemId = id;
    data.offerContexts[0].offerId.USSellerId = 0;
  }

  service.setServiceName("item-read-service");
  service.setServiceVersion("2.0.0");
  service.setConsumerId("905a21a9-4be5-48c3-8b45-140324e9ca8b");
  service.sendRequest(options, data);
};