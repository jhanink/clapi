### What is this?

Dev CL(i)API wrappers for cart and checkout

```sh
git clone https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts.git
cd dev-api-shortcuts
npm install
```
```sh
# append formatting option --JSON, --RAW, --PRETTY (PRETTY is the default)
```

![Pretty Printed output](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/blob/master/assets/api-shortcuts-jh1.png?raw=true)

### Features

* call an API and view the response in JSON or PRETTY mode
* the last response for each API call is cached to review, filter, or transform
* results are greppable, filterable, and processable via custom functions


### Commands

Currently available commands. [Add new requests here](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)

```sh
  
  #  NOTE: You can recall the last cached result to process or extract information
   
  #  --EXAMPLES
  
  # set output mode, pipe to grep, etc
  ./get-customer
  ./get-customer  --JSON  | more
  ./get-customer  | grep accountType
  ./get-customer  | less -R
  
  # with --EVAL, you can perform a filter to pull out a portion of the response
  ./get-customer  --EVAL payload.person.customerAccountId
  ./get-cart      --EVAL cart.id
  
  # with --CALL, you can perform arbitrary processing on the response using a custom function
  ./get-cart      --CALL listCartItems
  ```

##### → STAGE COMMANDS

```sh

  #   --SAMPLE CUSTOMER
  #     customerId:  688ddfc5-181f-46b5-a0e7-8dc139146253
  #     email:       node-1@wm.com
  
  ./get-customer 688ddfc5-181f-46b5-a0e7-8dc139146253        # customerId
  ./get-customer node-1@wm.com                               # email
```

```sh

  #   --CARDS
  
  ./create-gift-card 100    # amount
  ./create-temp-card 688ddfc5-181f-46b5-a0e7-8dc139146253    # customerId
```

```sh

  #   --SAMPLE CART
  #     cartId:     6a6f9ddb-8e95-4083-9efe-d1bbb544d03b
  #     customerId: 688ddfc5-181f-46b5-a0e7-8dc139146253
  
  ./get-cart    6a6f9ddb-8e95-4083-9efe-d1bbb544d03b         # cartId
  ./create-cart 688ddfc5-181f-46b5-a0e7-8dc139146253         # customerId
  ./clear-cart  6a6f9ddb-8e95-4083-9efe-d1bbb544d03b         # cartId
```

```sh

  #   --SAMPLE ITEMS
  #     name:     Peltor Bullseye 9 NRR 25 dB Earmuff, Blue
  #     offerId:  989CF1FB215E4C579A273357D8DE5111           # Add to cart
  #     itemId:   `./get-cart --EVAL=items[0].id`            # Find itemId after adding to cart
  
  #     name:     Case Logic USB Flash Drive Case for 2 Drives, Blue
  #     offerId:  26DCCE73B82544DCB9CDC13A20012EC6
  #     itemId:   `./get-cart --EVAL=items[0].id`
  
  ./add-to-cart       989CF1FB215E4C579A273357D8DE5111       # offerId
  ./add-to-cart       9875792                                # itemId
  ./update-cart-item  `./get-cart --EVAL=items[0].id` 5      # id, quantity   (not USItemId)
  ./delete-cart-item  `./get-cart --EVAL=items[0].id`        # id             (not USItemId)

```

##### → PROD COMMANDS

```sh

  #   --SAMPLE PURCHASE CONTRACT
  #     pcId:  e74dd26a-ef98-442e-bf88-86637b5b344d
   
  ./get-purchase-contract-prod e74dd26a-ef98-442e-bf88-86637b5b344d     # purchase contract Id
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

