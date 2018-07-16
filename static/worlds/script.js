var fs = require("fs");
var {dialog} = require("electron").remote;
var rimraf = require("rimraf");
var ncp = require("ncp").ncp;
var properties = require("../properties");

function renderItems() {
  var div = document.getElementById("worlds");
  while ( div.firstChild ) {
    div.removeChild(div.firstChild);
  }
  fs.readdir(__dirname + "/../../server",function(err,files) {
    if ( err ) throw err;
    files = files.filter(item => fs.statSync(__dirname + "/../../server/" + item).isDirectory())
      .filter(item => ["BuildData","Bukkit","CraftBukkit","Spigot","apache-maven-3.5.0","logs","plugins","work"].indexOf(item) <= -1);
    var mainWorld = files.indexOf(properties.readProperty("level-name"));
    for ( var i = 0; i < files.length; i++ ) {
      var button = document.createElement("button");
      button.innerText = "-";
      button.className = "world-remove-button";
      button["data-index"] = i;
      button.onclick = function() {
        if ( this["data-index"] == mainWorld ) {
          alert("You cannot delete the main world. If you wish to delete this world, you must first specify a new main world in the Configuration menu.");
        } else if ( confirm("Are you sure you want to permanently delete this world?") ) {
          rimraf(__dirname + "/../../server/" + files[this["data-index"]],function(err) {
            if ( err ) throw err;
            renderItems();
          });
        }
      }
      var span = document.createElement("span");
      span.innerText = " " + files[i] + (i == mainWorld ? " ★" : "");
      div.appendChild(button);
      div.appendChild(span);
      div.appendChild(document.createElement("br"));
    }
  });
}

function addWorld() {
  dialog.showOpenDialog({
    defaultPath: `${process.env.HOME}/Library/Application Support/minecraft/saves`,
    properties: ["openDirectory"]
  },function(files) {
    if ( ! files ) return;
    var split = files[0].split("/");
    fs.mkdir(__dirname + "/../../server/" + split[split.length - 1],function(err) {
      if ( err ) throw err;
      ncp(files[0],__dirname + "/../../server/" + split[split.length - 1],function(err) {
        if ( err ) throw err;
        renderItems();
      });
    });
  });
}

window.onload = renderItems;
