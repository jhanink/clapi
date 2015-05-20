### What is this?

Convenience Dev CLI for cart/checkout api calls

```sh
git clone https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts.git
cd dev-api-shortcuts
npm install
```
```sh
# append formatting option --JSON, --RAW, --PRETTY (PRETTY is the default)
```

![Pretty Printed output](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/blob/master/assets/api-shortcuts-jh1.png?raw=true)


### Commands

Currently available commands. [Add new requests here](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)

```sh
# NOTE: You can recall the last result using options but WITHOUT any lookup parameters.
# e.g.
#   ./get-customer
#   ./get-customer --JSON | more
#   ./get-customer | grep accountType
#   ./get-customer | less -R
#   ./get-customer --EVAL=payload.person.customerAccountId
#   ./get-customer --DEBUG
#   ./get-customer --ERROR
```

##### → STAGE COMMANDS

```sh

 SAMPLE CUSTOMER 1
   customerId:  688ddfc5-181f-46b5-a0e7-8dc139146253
   email:       node-1@wm.com


  # customerId
./get-customer 688ddfc5-181f-46b5-a0e7-8dc139146253

 # email
./get-customer node-1@wm.com

 # amount
./create-gift-card 100

 # customerId
./create-temp-card 688ddfc5-181f-46b5-a0e7-8dc139146253
```

```sh

 SAMPLE CART 1
   cartId:     6a6f9ddb-8e95-4083-9efe-d1bbb544d03b
   customerId: 688ddfc5-181f-46b5-a0e7-8dc139146253


 # cartId
./get-cart 6a6f9ddb-8e95-4083-9efe-d1bbb544d03b

 # customerId
./create-cart 688ddfc5-181f-46b5-a0e7-8dc139146253

 # cartId
./clear-cart 6a6f9ddb-8e95-4083-9efe-d1bbb544d03b
```

```sh

 SAMPLE ITEM 1
   name:     Braun Syncro Refill Solution, Pack of 2
   offerId:  72F051ACFF794D25A99692E11E239691         # Add to cart
   itemId:   `./get-cart --EVAL=items[0].id`          # Find itemId after adding to cart


 # offerId
./add-to-cart 72F051ACFF794D25A99692E11E239691  # Sample Item 1

 # itemId, quantity
./update-cart-item `./get-cart --EVAL=items[0].id` 5  # Sample Item 1

 # itemId
./delete-cart-item `./get-cart --EVAL=items[0].id` # Sample Item 1

```

##### → PROD COMMANDS

```sh

 SAMPLE PURCHASE CONTRACT 1
   pcId:  e74dd26a-ef98-442e-bf88-86637b5b344d


 # purchase contract Id 
./get-purchase-contract-prod e74dd26a-ef98-442e-bf88-86637b5b344d
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

