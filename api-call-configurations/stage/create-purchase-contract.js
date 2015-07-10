module.exports = function (state) {
  var service = require("../include/service")(state);

  var options = {
    url: 'http://xoservice-app.stg.pangaeasvcsxo.services.glb.prod.walmart.com/checkoutservice',
    method: 'PUT'
  };

  service.setServiceName("checkoutservice");
  service.setServiceVersion("1.0.0");

  service.setConsumerId("881f2838-7b97-49c3-a45e-1b36ceac7b9a");
  service.setDataPayload(payload2);
  // --- send request
  service.sendRequest(options);
};

var payload2 = {
  "payload": {
    "requestType": "ONEHG",
    "transactionCode": "26686011496922631859",
    "purchaseLineItems": [
      {
        "offerId": {
          "offerId": "94B764604EAC4D338E1EEE0625313722"
        },
        "unitPrice": {
          "currencyAmount": 50,
          "currencyUnit": "USD"
        },
        "quantity": 2,
        "lineItemPrice": {
          "currencyAmount": 100,
          "currencyUnit": "USD"
        },
        "fulfillmentDetail": {
          "fulfillmentOption": "S2S",
          "fulfillmentType": "PICKUP",
          "shipMethod": "STORE_DELIVERY",
          "selectionType": "USER",
          "storeFrontId": {
            "USStoreId": "2280"
          },
          "storeName": "Mountain view store",
          "address": {
            "addressLineOne": "850 Cherry Ave",
            "city": "San Bruno",
            "countryCode": "USA",
            "postalCode": "94066",
            "stateOrProvinceCode": "CA",
            "isApoFpo": false,
            "isPoBox": false
          }
        }
      }
    ],
    "purchaseContractTotals": {
      "subTotal": {
        "currencyAmount": 100,
        "currencyUnit": "USD"
      },
      "taxTotal": {
        "currencyAmount": 62.82,
        "currencyUnit": "USD"
      },
      "grandTotal": {
        "currencyAmount": 162.82,
        "currencyUnit": "USD"
      }
    },
    "buyer": {
      "buyerId": "4c9d677a-a645-466d-8ad7-8c5e6e491b97",
      "customerType": "INDIVIDUAL",
      "accountType": "INDIVIDUAL",
      "primaryContact": {
        "name": {
          "firstName": "David",
          "lastName": "Silver"
        },
        "phone": {
          "completeNumber": "912-192-9139"
        },
        "email": {
          "emailAddress": "d@g.com"
        }
      }
    },
    "payments": [
      {
        "paymentType": "PAID_PAYMENT",
        "pmId": "PREPAID",
        "amountToBeCharged": {
          "currencyAmount": 162.82,
          "currencyUnit": "USD"
        },
        "billingName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": {
          "emailAddress": "john@walmart.com"
        },
        "piHash": "PIH.raw.External.CASH.DUMMY.PayerId"
      }
    ],
    "taxOnOrder": {
      "totalAmount": {
        "currencyAmount": 62.82,
        "currencyUnit": "USD"
      },
      "type": "Sales Tax"
    },
    "pickupPersons": [
      {
        "name": {
          "firstName": "Joe",
          "lastName": "Smith"
        },
        "phone": {
          "completeNumber": "4086634567"
        },
        "isPrimary": true
      }
    ]
  }
};

//https://confluence.walmart.com/display/~jhanink/1HG+Create+Purchase+Contract+notes
var cpcPayload = {
  "payload": {
    "requestType": "ONEHG",
    "csrId": null,
    "currencyCode": null,
    "purchaseLineItems": [
      {
        "offerId": {
          "offerId": "2BAA934F24D84498A27513F81FAA233A"
        },
        "quantity": 1,
        "fulfillmentDetail": {
          "fulfillmentType": null,
          "selectionType": "USER",
          "fulfillmentOption": "S2S",
          "shipMethod": "STORE_DELIVERY",
          "storeFrontId": {
            "USStoreId": 5435
          },
          "lineItemIds": null,
          "address": {
            "addressLineOne": "777 Story Rd",
            "city": "San Jose",
            "countryCode": "USA",
            "postalCode": "95122",
            "stateOrProvinceCode": "CA",
            "id": null,
            "isApoFpo": false,
            "isPoBox": false
          },
          "email": null,
          "isRegistryAddress": null,
          "storeName": "San Jose Walmart Supercenter",
          "isAddressValid": null,
          "pickupDateTime": null
        },
        "tenantId": null,
        "verticalId": null,
        "unitPrice": {
          "currencyAmount": 558,
          "currencyUnit": "USD"
        },
        "lineItemPrice": {
          "currencyAmount": 558,
          "currencyUnit": "USD"
        },
        "shipMethodPrice": null
      },
      {
        "offerId": {
          "offerId": "738B439647FD412694733D73C5F715B3"
        },
        "quantity": 1,
        "fulfillmentDetail": {
          "fulfillmentType": null,
          "selectionType": "USER",
          "fulfillmentOption": "S2S",
          "shipMethod": "STORE_DELIVERY",
          "storeFrontId": {
            "USStoreId": 5435
          },
          "lineItemIds": null,
          "address": {
            "addressLineOne": "777 Story Rd",
            "city": "San Jose",
            "countryCode": "USA",
            "postalCode": "95122",
            "stateOrProvinceCode": "CA",
            "id": null,
            "isApoFpo": false,
            "isPoBox": false
          },
          "email": null,
          "isRegistryAddress": null,
          "storeName": "San Jose Walmart Supercenter",
          "isAddressValid": null,
          "pickupDateTime": null
        },
        "tenantId": null,
        "verticalId": null,
        "unitPrice": {
          "currencyAmount": 891,
          "currencyUnit": "USD"
        },
        "lineItemPrice": {
          "currencyAmount": 891,
          "currencyUnit": "USD"
        },
        "shipMethodPrice": null
      },
      {
        "offerId": {
          "offerId": "1FA37E30BB9A475897CB90CCC8FEDA24"
        },
        "quantity": 1,
        "fulfillmentDetail": {
          "fulfillmentType": null,
          "selectionType": "USER",
          "fulfillmentOption": "S2S",
          "shipMethod": "STORE_DELIVERY",
          "storeFrontId": {
            "USStoreId": 5435
          },
          "lineItemIds": null,
          "address": {
            "addressLineOne": "777 Story Rd",
            "city": "San Jose",
            "countryCode": "USA",
            "postalCode": "95122",
            "stateOrProvinceCode": "CA",
            "id": null,
            "isApoFpo": false,
            "isPoBox": false
          },
          "email": null,
          "isRegistryAddress": null,
          "storeName": "San Jose Walmart Supercenter",
          "isAddressValid": null,
          "pickupDateTime": null
        },
        "tenantId": null,
        "verticalId": null,
        "unitPrice": {
          "currencyAmount": 384,
          "currencyUnit": "USD"
        },
        "lineItemPrice": {
          "currencyAmount": 384,
          "currencyUnit": "USD"
        },
        "shipMethodPrice": null
      }
    ],
    "buyer": {
      "buyerId": "FECB44BCA7DB44FF98E3CE0941D844FF",
      "customerType": "INDIVIDUAL",
      "accountType": "INDIVIDUAL",
      "primaryContact": {
        "name": {
          "firstName": "Loosey",
          "lastName": "Boo Boo"
        },
        "phone": {
          "completeNumber": "888-888-8888"
        },
        "email": {
          "emailAddress": "loosey@walmart.com"
        }
      }
    },
    "payments": [
      {
        "paymentType": null,
        "pmId": "PREPAID",
        "billingName": {
          "firstName": "Loosey",
          "lastName": "Boo Boo"
        },
        "phone": null,
        "email": {
          "emailAddress": "loosey@walmart.com"
        },
        "amountToBeCharged": {
          "currencyAmount": 1833,
          "currencyUnit": "USD"
        },
        "piHash": "PIH.raw.External.CASH.DUMMY.PayerId"
      }
    ],
    "purchaseContractTotals": {
      "subTotal": {
        "currencyAmount": 1833,
        "currencyUnit": "USD"
      },
      "taxTotal": {
        "currencyAmount": 0,
        "currencyUnit": "USD"
      },
      "grandTotal": {
        "currencyAmount": 1833,
        "currencyUnit": "USD"
      }
    },
    "pickupPersons": [
      {
        "id": null,
        "name": {
          "firstName": "Loosey",
          "lastName": "Boo Boo"
        },
        "phone": null,
        "email": {
          "emailAddress": "loosey@walmart.com"
        },
        "isPrimary": null
      }
    ],
    "transactionCode": "93354956736696258904",
    "taxOnOrder": {
      "totalAmount": {
        "currencyAmount": 0,
        "currencyUnit": "USD"
      },
      "type": "Sales Tax"
    }
  }
};
