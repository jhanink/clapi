### What is this?

Convenience Dev CLI for cart/checkout api calls

```sh
git clone https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts.git
cd dev-api-shortcuts
npm install
```
```sh
# run a command on STAGE or PRODUCTION (below)
# append formatting option --JSON, --RAW, --PRETTY (PRETTY is the default)
```



### Commands

The set of available commands will grow and change over time. [Add your requests here](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)

##### → STAGE

```sh
./create-gift-card 100

./get-customer 688ddfc5-181f-46b5-a0e7-8dc139146253

./create-temp-card 688ddfc5-181f-46b5-a0e7-8dc139146253
```

##### → PRODUCTION

```sh
./get-purchase-contract-prod e74dd26a-ef98-442e-bf88-86637b5b344d
```



### Why is this a node program and not a collection of curl scripts?

Because node is more fun.



### Contribute

1. [Add your requests for more commands here](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues)

2. [A a link below using the github editor](https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/edit/master/README.md)

##### → TODO

https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts/issues/1



### Et Cetera

[See additional project goals](project-goals.md)

