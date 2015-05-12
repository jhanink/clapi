var args = require("yargs");

process.state = {
  args: args
};

require("./api-call-configurations/stage")();




