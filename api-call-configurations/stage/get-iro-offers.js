
module.exports = function (state) {
  var service = require("../include/service")(state);
  var id = state.args.id;
  var upc = state.args.upc;
  var wupc = state.args.wupc;
  if (!id && !upc && !wupc) {
    console.log("---> missing required (item or offer) id, upc, or wupc");return;
  }

  var options = {
    url: 'http://iro-webapp.stg0.iro.services.glb.prod.walmart.com/item-read-service/productOffers?rgs=PRODUCT_CONTENT,PRODUCT_ASSET,OFFER_PRODUCT,OFFER_PRICE,OFFER_INVENTORY',
    method: 'POST'
  };

  var data = {
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

  if (id) {
    if (id.length === 32) {
      data.offerContexts = [
        {
          "offerId": {
            "offerId": id
          }
        }
      ];
    } else {
      data.offerContexts = [
        {
          "offerId": {
            "USItemId": id,
            USSellerId: 0
          }
        }
      ];
    }
  }

  if (upc) {
    data.productContexts = [
      {
        "productId": {
          "upc": upc
        }
      }
    ];
  }

  if (wupc) {
    data.productContexts = [
      {
        "productId": {
          "wupc": wupc
        }
      }
    ];
  }

  service.setServiceName("item-read-service");
  service.setServiceVersion("2.0.0");
  service.setConsumerId("905a21a9-4be5-48c3-8b45-140324e9ca8b");
  service.sendRequest(options, data);
};