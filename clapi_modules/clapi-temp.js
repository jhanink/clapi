var clapi = require("./clapi-helpers");
module.exports = function (val) {
  return {
    missingFulfillmentPrices: function () {
      var test = val.test;
      var output = [];
      for (var i = 0; i < test.length; i++) {
        var key = "item-" + i;
        var str = key;
        if (test[i].storefrontPricing) {
          str += ": ok";
          output.push(str);
        } else {
          str += "\033[0;34m bad \033[0m";
          output.push(str);
        }
      }
      // return an object with an array
      return {"test.storefrontPricing": output};
    },
    test: function () {
      var obj = {
        a: {
          b: 1,
          j: {
            k: {
              m: "22",
              n: false,
              p: [1,2,3],
              q: [
                {aa: 1},
                {bb: 2}
              ]
            }
          }
        },
        c : [
          {
            d: {
              e:2
            }
          },
          {
            f: {
              g: {
                h: 2,
                rrrr: [

                ]
              }
            }
          }
        ]
      };
      var matches = [];
      var result = clapi._search(obj, "rrrrr", "", matches);
      console.log(result);
      process.exit();
    }
  }
};

/*

 Black        0;30     Dark Gray     1;30
 Blue         0;34     Light Blue    1;34
 Green        0;32     Light Green   1;32
 Cyan         0;36     Light Cyan    1;36
 Red          0;31     Light Red     1;31
 Purple       0;35     Light Purple  1;35
 Brown/Orange 0;33     Yellow        1;33
 Light Gray   0;37     White         1;37

 ○ • ■ · —

 */