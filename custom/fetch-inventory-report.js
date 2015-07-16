var fs = require("fs");
var args = require("yargs").argv;
var Converter=require("csvtojson").Converter;

var state = {
  args: args
};

var csvFileName = state.args.file;
var fileStream=fs.createReadStream(csvFileName);

var csvConverter=new Converter({constructResult:true});
csvConverter.on("end_parsed",function(jsonObj){
  console.log(JSON.stringify({"result":jsonObj}));
});

fileStream.pipe(csvConverter);
