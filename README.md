### What is this?

CLAPI - Command Line API wrappers for cart and checkout

```sh

git clone https://gecgithub01.walmart.com/jhanink/clapi.git
cd clapi
npm install
cd bin
```

View and search a JSON data tree as simply as navigating a file-system 

![Pretty Printed output](https://gecgithub01.walmart.com/jhanink/clapi/blob/master/assets/clapi_output.png?raw=true)


### Features

* Call an API and view in JSON, PRETTY, or Interactive mode
* Use the CLAPI result buffer to grep, pipe, or process with custom functions
* There is a UI, but it is a work in progress at a nascent stage 

### Use the UI

Work in progress, menu only, no command execution yet

```sh
# start an auto hot-reload server 
npm start

# open an auto hot-reloading UI
open -a "Google Chrome" http://localhost:3000

# open an auto hot-reloading UI with update indicator
open -a "Google Chrome" http://localhost:8080/webpack-dev-server/build/bundle

```

Run the API commands from the GUI

![Pretty Printed output](https://gecgithub01.walmart.com/jhanink/clapi/blob/master/assets/clapi-ui.gif?raw=true)

### Commands

[Add new requests here](https://gecgithub01.walmart.com/jhanink/clapi/issues)

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


##### → Clapi Todo:

* save the previous pasteboard to support position-relative `./cd ..` and `./cd next_node` style
* add a `./cd` command that works in a position-relative fashion.


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
  # using starts-with + case-insensitive matching 
  ./cf isAssociate
  ./cf isassoc
  
  # clapi-find aliases: ./cf, ./find, ./f
  ./cf email
  ./find email
  ./f email
```

![clapi find](https://gecgithub01.walmart.com/jhanink/clapi/blob/master/assets/cf_output.png?raw=true)


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

### Contribute

* [Open a github issue to request a new feature](https://gecgithub01.walmart.com/jhanink/clapi/issues)

### Related Documentation

* https://confluence.walmart.com/display/PGSCARTXO/Cart-Service-App+API
* https://confluence.walmart.com/display/PGSCARTXO/New+Checkout+Service+API
* http://mobile-qa-ci.homeoffice.wal-mart.com:8080/view/Item%20check/job/Inventory_check/
* [See additional project goals](docs/project-goals.md)

### Reads
* http://facebook.github.io/react/docs
* http://facebook.github.io/react/docs/addons.html
* http://webpack.github.io/docs/
* http://survivejs.com
* http://blog.namangoel.com/browserify-vs-webpack-js-drama
* http://blog.namangoel.com/css-in-js-in-css
* http://angular-tips.com/blog/2015/06/why-will-angular-2-rock/
* http://facebook.github.io/react/blog/2015/06/12/deprecating-jstransform-and-react-tools.html
* http://stackoverflow.com/questions/28553904/client-routing-using-react-router-and-server-side-routing
* https://github.com/mhart/react-server-example

### General Resources
* Christian Alfoni's webpack setup
   * https://christianalfoni.github.io/react-webpack-cookbook/index.html
   * http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
   * https://github.com/christianalfoni/webpack-express-boilerplate
   * http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
   * http://www.christianalfoni.com/articles/2015_05_18_Cerebral-developer-preview
* https://github.com/webpack/webpack
* https://github.com/rackt/react-router
* https://rackt.github.io/react-router/#HistoryLocation
* https://github.com/goatslacker/alt
* https://github.com/github/fetch
* (react material) 
   * https://github.com/callemall/material-ui
* (vanilla js material) 
   * https://github.com/Dogfalo/materialize
* https://www.npmjs.com/package/color
* https://github.com/FormidableLabs/radium
* https://github.com/FormidableLabs/component-playground
* https://github.com/FormidableLabs/converter-react
* https://github.com/yahoo/react-intl
* http://formatjs.io/react/

* Demo a node server
   * http://code.runnable.com
   
* Use React Components with backbone
   * http://www.thomasboyt.com/2013/12/17/using-reactjs-as-a-backbone-view.html
   * http://blog.mayflower.de/3937-Backbone-React.html
   * https://github.com/clayallsopp/react.backbone
   * http://joelburget.com/backbone-to-react/
   
* Flux 
   * https://github.com/goatslacker/alt
   * https://github.com/goatslacker/alt-tutorial
   
* Flux + react router example   
   * https://github.com/gaearon/flux-react-router-example
   * https://github.com/lostpebble/alt-react-router-example
   

### Walmart Resources
* https://gecgithub01.walmart.com/react/react-dev-guide
* https://gecgithub01.walmart.com/thor/getting-started
* https://gecgithub01.walmart.com/pages/react/showcase
* https://gecgithub01.walmart.com/react/analytics

### Next
* fetch
* mixins (deprecated)
* production mode

### Issues
* able to run app via webpack-hot-loader but not via a simple webserver
* run hot-loader and app node server at the same time
   * (try this) - https://github.com/FormidableLabs/converter-react
* improper to use jquery plugins that modify dom
   * http://stackoverflow.com/questions/25436445/using-jquery-plugins-that-transform-the-dom-in-react-components
* (wormhole pattern for jquery plugins)
   * https://gist.github.com/ryanflorence/7cdaea0af8e334413502
* SSR isomorphism issue with material-ui:
   * https://github.com/callemall/material-ui/issues/748
* list of issues in Quip
   * https://quip.com/YRudAaDW6UXD
* isomorphic data fetching with react router
   * https://github.com/rackt/react-router/issues/57

### Done
* tie a route change to a targeted view update - 6.11.2015
* add css to react components - 6.11.2015
* radium - 6.11.2015
* json tree view
   * (react component)
      * http://react.rocks/example/react-json-inspector
      * https://bitbucket.org/davevedder/react-json-viewer
   * (jquery component)
      * http://blog.yesmeck.com/jquery-jsonview/
* Webpack + Express
   * http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
   * https://github.com/christianalfoni/webpack-express-boilerplate
* react with addons
* isomorphic server rendering
* propTypes

### Extras / Alternatives
* https://github.com/systemjs/systemjs

