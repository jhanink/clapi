### What is this?

CLAPI - Command Line API processor (for various service APIs)

The intent of this is to create CLI + GUI interfaces to service APIs with the goal of learning React in the process.

#### The CLI features
* output formatting (pretty printing with color, raw JSON)
* interactive/iterative/drill-down mode from the root node
* search mode
 
#### React UI
* use webpack for 
   * build and babel transpilation of es6 and jsx code
   * file watchers and hot deploy to the client
* use jsx for react view components
* basic flux pattern with actions/stores
* use google material-ui for the look and feel
* use react router and alt-iso for isomorphic js (server + client rendering)

```sh

git clone https://github.com/jhanink/clapi.git
cd clapi
npm install -g nodemon
npm install
cd bin

```

View and search a JSON data tree as simply as navigating a file-system 

![Pretty Printed output](https://github.com/jhanink/clapi/blob/master/assets/clapi_output.png?raw=true)


### Features

* Call an API and view in JSON, PRETTY, or Interactive mode
* Use the CLAPI result buffer to grep, pipe, or process with custom functions
* Use the GUI or CLI below

### Use the UI

React UI components plus material-ui theme

```sh

# turn MOCKS mode on
export CLAPI_SET_MOCKS=ON
  
# start an auto hot-reload server 
npm start

# open an auto hot-reloading UI
open -a "Google Chrome" http://localhost:3000

```

DEMO - Run the API commands from the GUI

https://github.com/jhanink/clapi/blob/master/assets/clapi-ui.gif

### Use the CLI

Command line access to API services with output formatting, search, and interactive features

##### → STAGE : Cart & Checkout

cd to `clapi/bin`

```sh
  # turn MOCKS mode on
  export CLAPI_SET_MOCKS=ON
```

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

cd to `clapi/bin`

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
  
  ./get-iro-offers --upc 084522601117                        # get IRO offers by upc
  ./get-iro-offers --wupc 0084522601117                      # get IRO offers by wupc
  
  ./get-receipt 26686011496922631859                         # get receipt data by TC#
```

```sh
  ./create-purchase-contract                                 # create 1hg sample purchase contract

  ./get-purchase-contract \
     53f91076-0f31-4456-b214-74e3741b7d77                    # get purchase contract by id

```

##### → STAGE : Set Configs

edit the file `~/clapi-config-override.json` or use the `config/set-*` commands.

cd to `clapi/bin/config`

```sh

  ./set-cid                                                  # set cid for purchase-contract

```

##### → OPTIONS : DISPLAY FORMAT, EXPRESSION EVALUATION, CUSTOM FUNCTIONS

cd to `clapi/bin`

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


##### → CLAPI : INTERACTIVE MODE

cd to `clapi/bin`

```sh
  
  # implicitly save a result to the clapi buffer
  ./get-cart
  
  # explicitly save a json file to the clapi buffer
  ./clapi -f=../samples/SAMPLE.json
  
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
  # using starts-with + case-insensitive matching 
  ./cf isAssociate
  ./cf isassoc
  
  # clapi-find aliases: ./cf, ./find, ./f
  ./cf email
  ./find email
  ./f email
```

![clapi find](https://github.com/jhanink/clapi/blob/master/assets/cf_output.png?raw=true)


```sh
  
  # functions
  ./c -f=../samples/missingFulfillmentPrices.json
  ./c --FUNC=missingFulfillmentPrices
```
  
##### → CLAPI : MOCKS MODE

cd to `clapi/bin`

* The CLI and UI return mock data when MOCKS mode is ON.
* The CLI will display a visual cue `==========   clapi  mocks mode  ON`
* The Clapi UI response data will contain an extra property `MOCK-DATA:true`

```sh

  # turn mocks mode on and run any command
  export CLAPI_SET_MOCKS=ON
  ./get-customer
  ./c
  
  # turn mocks mode off
  export CLAPI_SET_MOCKS=OFF
```  

##### → ETC

cd to `clapi/bin`

```sh

  # get torbit headers
  ./curl-torbit http://www-e6.walmart.com -i
```

##### → TIPS & TRICKS

cd to `clapi/bin`

```sh

  # find which nodes have values
  ./c -f=../samples/missingFulfillmentPrices.json && \
  for var in $(seq 0 20); \
  do \
    echo "--- $var" && \
    ./c test[$var].storefrontPricing.currentPrice.currentValue; \
  done;
  
  # find selected purchase contract shipping options
  ./c -f=../samples/purchaseContract.json;
  for i in {0..3}; do ./c groups[0].shippingOptions[$i].selected; done;
```

