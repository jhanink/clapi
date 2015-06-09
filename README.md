### What is this?

CLAPI - Command Line API wrappers for cart and checkout

```sh
git clone https://gecgithub01.walmart.com/jhanink/clapi.git
cd clapi
npm install
cd bin
```

Hierarchically display JSON data with tree-view drill-down and property search 

![Pretty Printed output](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/blob/master/assets/clapi_output.png?raw=true)

### Features

```
* Call an API and view in JSON, PRETTY, or Interactive mode
* Use the CLAPI result buffer to grep, pipe, or process with custom functions
```


### Commands

[Add new requests here](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)

Available commands:

##### → STAGE : Cart & Checkout

```sh
  
  ./get-customer 688ddfc5-181f-46b5-a0e7-8dc139146253        # customerId
  ./get-customer node-1@wm.com                               # email
```

```sh
  
  ./create-gift-card 100                                     # amount
  ./create-temp-card 688ddfc5-181f-46b5-a0e7-8dc139146253    # customerId
```

```sh
  
  ./create-cart 688ddfc5-181f-46b5-a0e7-8dc139146253         # customerId
  
  ./create-cart 688ddfc5-181f-46b5-a0e7-8dc139146253 \
      --EVAL cart.id | pbcopy                                # create cart, copy to clipboard
  
  ./get-cart 6a6f9ddb-8e95-4083-9efe-d1bbb544d03b            # cartId
  ./clear-cart 6a6f9ddb-8e95-4083-9efe-d1bbb544d03b          # cartId
```

```sh
  
  ./add-to-cart 989CF1FB215E4C579A273357D8DE5111             # offerId
  ./add-to-cart 9875792                                      # itemId
  ./update-cart-item  `./get-cart --EVAL=items[0].id` 5      # id, quantity   (not USItemId)
  ./delete-cart-item  `./get-cart --EVAL=items[0].id`        # id             (not USItemId)
```

##### → STAGE : Other

```sh
  
  ./fetch-inventory-report --NEW                             # fetches the latest report
  ./fetch-inventory-report --EVAL result[0]                  # get first item from cached result
  ./fetch-inventory-report --FUNC printFetchedItems          # print condensed report
```
```sh
  
  ./get-iro-offers 989CF1FB215E4C579A273357D8DE5111          # get IRO offers by offerId
  ./get-iro-offers 17753319                                  # get IRO offers by USItemId
  ./get-iro-offers --MORE                                    # print cached result
  ./get-iro-offers --EVAL status                             # print IRO status (OK, PARTIAL..)
```

##### → PROD : Cart & Checkout

```sh
   
  ./get-purchase-contract-prod \
     e74dd26a-ef98-442e-bf88-86637b5b344d                    # purchase contract Id
```

##### → OPTIONS : Output mode, expression eval, custom functions

```sh
  
  # output modes and options
  ./get-customer                                             # default output
  ./get-custmer --JSON                                       # JSON output
  ./get-customer --JSON | more                               # JSON piped to more
  ./get-customer --LESS                                      # default piped to less
  ./get-customer | grep accountType                          # default, grep for accountType
  
  # interactive object navigation mode
  ./get-cart -i                                              # list obj props under root node
  ./get-cart -i cart                                         # list obj props under named node
  ./get-cart -i cart --NOCOLOR | pbcopy                      # remove color codes before copy
  
  ./get-iro-offers -i \
       payload[0].product.productAttributes["has-mercury"]   # use dashes instead of spaces in keys
  
  # evaluate fixed nodes 
  ./get-customer --EVAL payload.person.customerAccountId     # eval object for a json property 
  ./get-cart --EVAL cart.id                                  # eval object for a json property  
  ./get-cart --EXPR obj.cart.id                              # eval from root object reference
  
  # call custom functions
  ./get-cart --FUNC printCartItems                           # run a custom function on result
```

All the above commands save to the CLAPI buffer and can be immediately driven by ./clapi (below)


##### → CLAPI : interactive / iterative mode


```sh
  
  # implicitly save a result to the clapi buffer
  ./get-cart
  
  # explicitly save a json file to the clapi buffer
  ./clapi -s=../samples/SAMPLE.json
  
  # interactive mode against the existing clapi buffer
  ./clapi
  ./clapi summary
  
  # use the ./clapi alias ./c
  ./c summary.shippingCosts
  ./c summary.shippingCosts[0]
  
  # turn datatype display on
  export CLAPI_SET_DATATYPE=ON
  ./c
  
  # turn datatype display off
  export CLAPI_SET_DATATYPE=OFF
  ./c
```  
  
```sh

  # find all matches by property name (deep search)
  # uses starts-with + case-insensitive matching 
  ./cf isAssociate
  ./cf isassoc
  
  # clapi-find aliases: ./cf, ./find, ./f
  ./cf email
  ./find email
  ./f email
```

![clapi find](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/blob/master/assets/cf_output.png?raw=true)


```sh
  
  # functions
  ./c -s=../samples/missingFulfillmentPrices.json
  ./c --FUNC=missingFulfillmentPrices
  ```
  
##### → ETC

```sh

  # get torbit headers
  ./curl-torbit http://www-e6.walmart.com -i
```

##### → TIPS & TRICKS

```sh

  # find which nodes have values
  ./c -s=../samples/missingFulfillmentPrices.json && \
  for var in $(seq 0 20); \
  do \
    echo "--- $var" && \
    ./c test[$var].storefrontPricing.currentPrice.currentValue; \
  done;
  
  # find selected purchase contract shipping options
  ./c -s=../samples/purchaseContract.json;
  for i in {0..3}; do ./c groups[0].shippingOptions[$i].selected; done;
  
```


### Why is this a node program instead of curl scripts?

Because node is more fun.



### Contribute

* [Open a github issue to request a new feature](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)



### Related Documentation

* https://confluence.walmart.com/display/PGSCARTXO/Cart-Service-App+API
* https://confluence.walmart.com/display/PGSCARTXO/New+Checkout+Service+API
* http://mobile-qa-ci.homeoffice.wal-mart.com:8080/view/Item%20check/job/Inventory_check/
* [See additional project goals](docs/project-goals.md)

### Resources
* http://survivejs.com
* https://github.com/callemall/material-ui
* https://www.gitbook.com
