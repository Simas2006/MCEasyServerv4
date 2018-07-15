var fs = require("fs");
var items = [
  {
    name: "Server Port",
    realName: "server-port",
    type: "number",
    value: 25565,
    info: "The network port on your computer used by the server. Can not be less than 1024, or greater than 65536. Default = 25565"
  },
  {
    name: "Main World",
    realName: "level-name",
    type: "text",
    value: "world",
    info: "The world new players will spawn into, unless a multi-world plugin overrides this mechanic. Must be a valid world name. Default = \"world\""
  },
  {
    name: "Enable Command Blocks",
    realName: "enable-command-block",
    type: "boolean",
    value: true,
    info: "Determines whether command blocks operate correctly on the server. Default = false"
  }
];

function renderItems() {
  var div = document.getElementById("options");
  for ( var i = 0; i < items.length; i++ ) {
    var b = document.createElement("b");
    b.innerText = items[i].name + " ";
    var input = document.createElement("input");
    input.type = items[i].type == "boolean" ? "checkbox" : items[i].type;
    if ( items[i].type != "boolean" ) input.value = items[i].value;
    else input.checked = items[i].value;
    input["data-index"] = i;
    input.onchange = function() {
      if ( items[this["data-index"]].type != "boolean" ) items[this["data-index"]].value = this.value;
      else items[this["data-index"]].value = this.checked;
    }
    input.onkeypress = function() {
      if ( items[this["data-index"]].type != "boolean" ) items[this["data-index"]].value = this.value;
      else items[this["data-index"]].value = this.checked;
    }
    var info = document.createElement("p");
    info.innerText = items[i].info;
    div.appendChild(b);
    div.appendChild(input);
    div.appendChild(document.createElement("br"));
    div.appendChild(info);
    div.appendChild(document.createElement("br"));
  }
}

function saveData() {
  var string = "";
  for ( var i = 0; i < items.length; i++ ) {
    string += `${items[i].realName}=${items[i].value}\n`;
  }
  console.log(string);
}

window.onload = renderItems;
