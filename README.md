### What is this?

Command line convenience utils for cart/checkout api calls

```
git clone https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts.git
cd dev-api-shortcuts
npm install
```
```
# run a command on STAGE or PRODUCTION (below)
# append formatting option --JSON, --RAW, --PRETTY (PRETTY is the default)
```

### Commands

#### → STAGE

```
./create-gift-card 100
``` 

```
./get-customer 688ddfc5-181f-46b5-a0e7-8dc139146253
```

```
./create-temp-card 688ddfc5-181f-46b5-a0e7-8dc139146253
```

#### → PRODUCTION

```
./get-purchase-contract-prod e74dd26a-ef98-442e-bf88-86637b5b344d
```

### Todo

```
./check_all_stage_envs  # tests various staging urls for availability in one go and returns a concise report
```

### Why is this a node program and not a collection of curl scripts?

Because node is more fun.


