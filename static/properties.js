var fs = require("fs");
var propData,propDataRaw;

function readProperty(key) {
  if ( ! propData ) {
    propDataRaw = fs.readFileSync(__dirname + "/../server/server.properties").toString().split("\n");
    propData = propDataRaw.filter(item => ! item.startsWith("#")).map(item => item.split("="));
  }
  var selected = propData.filter(item => item[0] == key);
  if ( selected.length <= 0 ) throw new Error("Invalid key into server.properties");
  return selected[0][1];
}

function setProperty(key,value) {
  if ( ! propData ) {
    propDataRaw = fs.readFileSync(__dirname + "/../server/server.properties").toString().split("\n");
    propData = propDataRaw.filter(item => ! item.startsWith("#")).map(item => item.split("="));
  }
  var index = propDataRaw.map((item,index) => item.startsWith(key) ? index : -1).filter(item => item > -1);
  if ( index.length <= 0 ) throw new Error("Invalid key into server.properties");
  propDataRaw[index[0]] = `${key}=${value}`;
  console.log(propDataRaw,index[0]);
  fs.writeFileSync(__dirname + "/../server/server.properties",propDataRaw.join("\n"));
  propData = null;
}

module.exports = {readProperty,setProperty};
