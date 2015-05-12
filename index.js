var args = require("yargs").argv;

process.state = {
  args: args
};

require("./api-call-configurations/stage")();




