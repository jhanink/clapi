var clapiConfig = require("../include/clapi-config");

module.exports = function (state) {
  var service = require("../include/service")(state);

  var options = {
    url: clapiConfig.checkout.purchaseContractEndpoint,
    method: 'PUT'
  };

  service.setTenantId(clapiConfig.general.tenantId);
  service.setVerticalId(clapiConfig.general.verticalId);
  service.setLocaleId(clapiConfig.general.localeId);
  service.setKeyVersion(clapiConfig.general.keyVersion);
  service.setCorrelationId(clapiConfig.general.correlationId);

  service.setServiceName(clapiConfig.checkout.serviceName);
  service.setServiceVersion(clapiConfig.checkout.serviceVersion);
  service.setServiceEnv(clapiConfig.checkout.serviceEnv);
  service.setConsumerUserId(clapiConfig.customer.cid);
  service.setConsumerId(clapiConfig.checkout.consumerId);
  service.setAuthSignature(clapiConfig.checkout.authSignature);

  service.setDataPayload(payload3);

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


var payload3 = {
  "payload":{
    "requestType":"ONEHG",
    "transactionCode":"26686011496922631859",
    "purchaseLineItems":[
      {
        "offerId":{
          "offerId":"94B764604EAC4D338E1EEE0625313722"
        },
        "unitPrice":{
          "currencyAmount":8.85,
          "currencyUnit":"USD"
        },
        "quantity":1,
        "lineItemPrice":{
          "currencyAmount":8.85,
          "currencyUnit":"USD"
        },
        "fulfillmentDetail":{
          "fulfillmentOption":"S2S",
          "fulfillmentType":"PICKUP",
          "shipMethod":"STORE_DELIVERY",
          "selectionType":"USER",
          "storeFrontId":{
            "USStoreId":"2280"
          },
          "storeName":"Mountain View Walmart Store",
          "address":{
            "addressLineOne":"600 Showers Dr",
            "city":"Mountain View",
            "countryCode":"USA",
            "postalCode":"94040",
            "stateOrProvinceCode":"CA",
            "isApoFpo":false,
            "isPoBox":false
          }
        }
      }
    ],
    "purchaseContractTotals":{
      "subTotal":{
        "currencyAmount":8.85,
        "currencyUnit":"USD"
      },
      "taxTotal":{
        "currencyAmount":0,
        "currencyUnit":"USD"
      },
      "grandTotal":{
        "currencyAmount":8.85,
        "currencyUnit":"USD"
      }
    },
    "buyer":{
      "buyerId":"5d456dc1-c81e-4314-86b3-7b32dd31f64d",
      "customerType":"INDIVIDUAL",
      "accountType":"INDIVIDUAL",
      "primaryContact":{
        "name":{
          "firstName":"node-1",
          "lastName":"H"
        },
        "phone":{
          "completeNumber":"888-888-8888"
        },
        "email":{
          "emailAddress":"node-1@wm.com"
        }
      },
    },
    "payments":[
      {
        "paymentType":"PAID_PAYMENT",
        "pmId":"PREPAID",
        "amountToBeCharged":{
          "currencyAmount":8.85,
          "currencyUnit":"USD"
        },
        "billingName":{
          "firstName":"node-1",
          "lastName":"H"
        },
        "email":{
          "emailAddress":"node-1@wm.com"
        },
        "piHash":"PIH.raw.External.CASH.DUMMY.PayerId"
      }
    ],
    "taxOnOrder":{
      "totalAmount":{
        "currencyAmount":0,
        "currencyUnit":"USD"
      },
      "type":"Sales Tax"
    },
    "pickupPersons":[
      {
        "name":{
          "firstName":"node-1",
          "lastName":"H"
        },
        "phone":{
          "completeNumber":""
        },
        "isPrimary":true,
      }
    ],
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

/*
 Headers:

 Accept: application/json
 WM_SVC.VERSION: 1.0.0
 WM_SVC.ENV: stg
 WM_CONSUMER.IP: 172.29.175.171
 WM_QOS.CORRELATION_ID: d1f0c0d2-2cf4-497b-b630-06d609d987b0
 WM_SEC.AUTH_TOKEN: WgGaTf5YlI8naVndAkf2r9kmnRcuYxPbeOuGgXo0aoeyVCoHTpVufCPGTSC0iqtFPgz
 WM_TENANT_ID: 0
 WM_VERTICAL_ID: 8
 WM_LOCALE_ID: eng_USA
 WM_DEVICE_ID: 01
 DEVICE_TYPE: browser
 USER_AGENT: Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20120403211507 Firefox/12.0
 DEVICE_LANGUAGE: eng_USA
 DEVICE_OS: MAC OSX Lion
 DEVICE_TZ: 2012-04-25T12:00:00
 WM_IFX.CLIENT_TYPE: Java
 WM_CONSUMER.ID: 881f2838-7b97-49c3-a45e-1b36ceac7b9a
 WM_SVC.NAME: checkoutservice
 WM_CONSUMER.USER_ID: 85eede94-3796-4d34-a6b9-0c286326a10d
 WM_CONSUMER.INTIMESTAMP: 1416607158639
 WM_SEC.AUTH_SIGNATURE: qcQtdV2tcjqk3RRSlB5i6oU4WD/QmgJUXWWwReRz/DtG05zrJ6cM/zRm0l2P2rmoZU6MqcX3HLeNLAjGsmKE0Yp2rmPi8lZCBgLGNVZLIpmqlg7b5N+FMOZoqYqI+ipOAgIgRKEleS4onHFo0FHhciySZL2Vxrf08LO6+hIqfrQ=
*/
