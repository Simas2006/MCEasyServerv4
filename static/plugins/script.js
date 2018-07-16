var fs = require("fs");
var {dialog} = require("electron").remote;
var rimraf = require("rimraf");
var ncp = require("ncp").ncp;
var properties = require("../properties");

function renderItems() {
  var div = document.getElementById("plugins");
  while ( div.firstChild ) {
    div.removeChild(div.firstChild);
  }
  fs.readdir(__dirname + "/../../server/plugins",function(err,files) {
    if ( err ) throw err;
    files = files.filter(item => item.endsWith(".jar"));
    for ( var i = 0; i < files.length; i++ ) {
      var button = document.createElement("button");
      button.innerText = "-";
      button.className = "plugin-remove-button";
      button["data-index"] = i;
      button.onclick = function() {
        if ( confirm("Are you sure you want to permanently delete this plugin?") ) {
          fs.unlink(__dirname + "/../../server/plugins/" + files[this["data-index"]],function(err) {
            if ( err ) throw err;
            renderItems();
          });
        }
      }
      var span = document.createElement("span");
      span.innerText = " " + files[i];
      div.appendChild(button);
      div.appendChild(span);
      div.appendChild(document.createElement("br"));
    }
  });
}

function addPlugin() {
  dialog.showOpenDialog({
    defaultPath: `${process.env.HOME}/Downloads`,
    properties: ["openFile"],
    filters: [
      {name: "JAR File",extensions: ["jar"]}
    ]
  },function(files) {
    if ( ! files ) return;
    var split = files[0].split("/");
    ncp(files[0],__dirname + "/../../server/plugins/" + split[split.length - 1],function(err) {
      if ( err ) throw err;
      renderItems();
    });
  });
}

window.onload = renderItems;
