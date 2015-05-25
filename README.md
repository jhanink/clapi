### What is this?

CLAPI - Command Line API wrappers for cart and checkout

```sh
git clone https://gecgithub01.walmart.com/jhanink/clapi.git
cd clapi
npm install
```


![Pretty Printed output](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/blob/master/assets/clapi.gif?raw=true)

### Features

* Call an API and view the response in JSON or PRETTY mode
* Get the last response for each API call is cached to review, filter, or transform
* Grep, filter, or apply custom functions at the time of call or last cached result


### Commands

Currently available commands. [Add new requests here](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)

##### → STAGE - Cart & Checkout

```sh
  
  ./get-customer 688ddfc5-181f-46b5-a0e7-8dc139146253        # customerId
  ./get-customer node-1@wm.com                               # email
```

```sh
  
  ./create-gift-card 100    # amount
  ./create-temp-card 688ddfc5-181f-46b5-a0e7-8dc139146253    # customerId
```

```sh
  
  ./create-cart 688ddfc5-181f-46b5-a0e7-8dc139146253         # customerId
  
  ./create-cart 688ddfc5-181f-46b5-a0e7-8dc139146253 \       # create cart, copy to clipboard
     --EVAL cart.id | pbcopy
  
  ./get-cart    6a6f9ddb-8e95-4083-9efe-d1bbb544d03b         # cartId
  ./clear-cart  6a6f9ddb-8e95-4083-9efe-d1bbb544d03b         # cartId
```

```sh
  
  ./add-to-cart       989CF1FB215E4C579A273357D8DE5111       # offerId
  ./add-to-cart       9875792                                # itemId
  ./update-cart-item  `./get-cart --EVAL=items[0].id` 5      # id, quantity   (not USItemId)
  ./delete-cart-item  `./get-cart --EVAL=items[0].id`        # id             (not USItemId)
```

##### → STAGE - Other

```sh
  
  ./fetch-inventory-report --NEW                             # fetches the latest report
  ./fetch-inventory-report --EVAL result[0]                  # get first item from cached result
  ./fetch-inventory-report --FUNC listFetchedItems           # print condensed report from cached result
```
```sh
  
  ./get-iro-offers 989CF1FB215E4C579A273357D8DE5111          # get IRO offers by offerId
  ./get-iro-offers 17753319                                  # get IRO offers by USItemId
  ./get-iro-offers --MORE                                    # print cached result
  ./get-iro-offers --EVAL status                             # print IRO offer status (OK, PARTIAL..)
```

##### → PROD - Cart & Checkout

```sh
   
  ./get-purchase-contract-prod e74dd26a-ef98-442e-bf88-86637b5b344d     # purchase contract Id
```

### OPTIONS

```sh
  
  #  NOTE: You can recall the last cached result to process or extract information
   
  #  --EXAMPLES
  
  # set output mode, pipe to grep, etc
  ./get-customer
  ./get-custmer   --JSON
  ./get-customer  --JSON | more
  ./get-customer  --LESS
  ./get-customer  | grep accountType
  
  # with --EVAL, you can perform a filter to pull out a portion of the response
  ./get-customer  --EVAL payload.person.customerAccountId
  ./get-cart      --EVAL cart.id
  
  # with --EXPR, you can refer to the result object using `obj` or `val`
  ./get-cart      --EXPR obj.cart.id
  ./get-cart      --EXPR val.cart.id
  
  # with --FUNC, you can call functions that do custom processing on the response data
  ./get-cart      --FUNC listCartItems
  
  ```


### Why is this a node program and not a collection of curl scripts?

Because node is more fun.



### Contribute

* [Open a github issue to request a new feature](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)



### Et Cetera

* [See additional project goals](project-goals.md)


### Related Documentation

* https://confluence.walmart.com/display/PGSCARTXO/Cart-Service-App+API
* https://confluence.walmart.com/display/PGSCARTXO/New+Checkout+Service+API
* http://mobile-qa-ci.homeoffice.wal-mart.com:8080/view/Item%20check/job/Inventory_check/

