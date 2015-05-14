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

The set of available commands will grow and change over time. [Add your requests here](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)

##### → STAGE

```sh

# get customer by customerId
./get-customer 688ddfc5-181f-46b5-a0e7-8dc139146253

# get customer by email
./get-customer node-1@wm.com

# create gift card for some amount
./create-gift-card 100

# create a temp card for a customer by customerId
./create-temp-card 688ddfc5-181f-46b5-a0e7-8dc139146253
```

##### → PRODUCTION

```sh

# get production purchase contract 
./get-purchase-contract-prod e74dd26a-ef98-442e-bf88-86637b5b344d
```



### Why is this a node program and not a collection of curl scripts?

Because node is more fun.



### Contribute

* [Open a github issue to request a new feature](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)
* [Add a link to it below using the github editor](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/edit/master/README.md)

##### → TODO

* https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues/1
* https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues/2


### Et Cetera

[See additional project goals](project-goals.md)

