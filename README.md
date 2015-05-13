### What is this?

Command line convenience utils for cart/checkout api calls

```
git clone https://gecgithub01.walmart.com/jhanink/dev-api-shortcuts.git
cd dev-api-shortcuts
npm install
```

### Commands

Follow any command with a formatting option: 
* --RAW     : unformatted response
* --JSON    : formatted json
* --PRETTY  : pretty-printed, colorized (DEFAULT)

example: `create-gift-card 100 --JSON`


#### → STAGE

```
create-gift-card 100
``` 

#### → PRODUCTION

```
get-pc-prod e74dd26a-ef98-442e-bf88-86637b5b344d
```

### Why is this a node program and not a simple shell script?

Because node is more fun.
