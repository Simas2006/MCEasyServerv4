var fs = require("fs");
var rimraf = require("rimraf");
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
          alert("You cannot delete the main world. If you wish to delete this world, you must first change the main world in the Configuration menu.");
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

window.onload = renderItems;
