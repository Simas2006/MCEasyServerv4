var fs = require("fs");
var properties = require("../properties");
var items = [
  {
    name: "Main World",
    realName: "level-name",
    type: "text",
    info: "The world new players will spawn into, unless a multi-world plugin overrides this mechanic. Must be a valid world name. Default = \"world\""
  },
  {
    name: "MOTD (Message of the Day)",
    realName: "motd",
    type: "text",
    info: "The text shown below the server name in the multiplayer menu. Default = \"A Minecraft Server\""
  },
  {
    name: "Server Port",
    realName: "server-port",
    type: "number",
    info: "The network port on your computer used to run the server. Default = 25565"
  },
  {
    name: "Enable Whitelist",
    realName: "white-list",
    type: "boolean",
    info: "Determines whether a configured whitelist is enforced. Default = false"
  },
  {
    name: "Enable Command Blocks",
    realName: "enable-command-block",
    type: "boolean",
    info: "Determines whether command blocks operate correctly on the server. Default = false"
  },
  {
    name: "Maximum Player Count",
    realName: "max-players",
    type: "number",
    info: "The maximum number of players that can be connected to the server at one timer. Default = 20"
  },
  {
    name: "Enable Snooper",
    realName: "snooper-enabled",
    type: "boolean",
    info: "Determines whether your server sends small amounts of information about your server to Mojang. Default = true"
  },
  {
    name: "Default Gamemode",
    realName: "gamemode",
    type: "number",
    info: "The default gamemode for new players (0 - Survival, 1 - Creative, 2 - Adventure, 3 - Spectator). Default = 0 (Survival)"
  },
  {
    name: "Difficulty",
    realName: "difficulty",
    type: "number",
    info: "The difficulty level used by the server (0 - Peaceful, 1 - Easy, 2 - Normal, 3 - Hard). Default = 1 (Easy)"
  },
  {
    name: "Hardcore",
    realName: "hardcore",
    type: "boolean",
    info: "Determines whther or not the server is using hardcore mode. Default = false"
  },
  {
    name: "Enable PvP",
    realName: "pvp",
    type: "boolean",
    info: "Determines whether or not PvP combat is enabled on the server. Default = true"
  },
  {
    name: "Resource Pack",
    realName: "resource-pack",
    type: "text",
    info: "Optional URI to a resource pack folder to be downloaded by players connecting to the server. Default = none"
  },
  {
    name: "Maximum Build Height",
    realName: "max-build-height",
    type: "number",
    info: "The maximum build height on the server. Default = 256"
  },
  {
    name: "Force Gamemode",
    realName: "force-gamemode",
    type: "boolean",
    info: "Determines whether or not players spawn in the server default gamemode (if true), or in the gamemode they were in last (if false). Default = false"
  },
  {
    name: "Online Mode",
    realName: "online-mode",
    type: "boolean",
    info: "Determines whether or not the server checks with Mojang's servers whether connecting players have valid accounts. If this is false, players with hacked/fake accounts can connect to the server! Unless absolutely necessary, do not change this setting! Default = true"
  },
  {
    name: "Player Idle Timeout",
    realName: "player-idle-timeout",
    type: "number",
    info: "The number of minutes players must be inactive for until they are kicked. If zero, this feature is disabled. Default = 0 (disabled)"
  },
  {
    name: "Render Distance",
    realName: "view-distance",
    type: "number",
    info: "The maximum render distance (in chunks) while on the server. Default = 10"
  },
  {
    name: "Network Compression Threshold",
    realName: "network-compression-threshold",
    type: "number",
    info: "The minimum size of a compressed packet. Unless your network allows the server to work better when this is changed, keep this at the default. Default = 256"
  },
  {
    name: "Enable Flight",
    realName: "allow-flight",
    type: "boolean",
    info: "Determines whether or not players with flight mods installed can fly when not in Creative mode. Default = false"
  },
  {
    name: "Enable Nether",
    realName: "allow-nether",
    type: "boolean",
    info: "Determines whether or not players are able to access the nether. Default = true"
  },
  {
    name: "Spawn Animals",
    realName: "spawn-animals",
    type: "boolean",
    info: "Determines whether or not animals and other passive mobs are able to spawn. Default = true"
  },
  {
    name: "Spawn Monsters",
    realName: "spawn-monsters",
    type: "boolean",
    info: "Determines whether or not monsters and other hostile mobs are able to spawn. Default = true"
  },
  {
    name: "Spawn Villagers",
    realName: "spawn-npcs",
    type: "boolean",
    info: "Determines whether or not villagers are able to spawn. Default = true"
  },
  {
    name: "Enable Structures",
    realName: "generate-structures",
    type: "boolean",
    info: "Determines whether or not structures are generated when a new world is created. Default = true"
  },
  {
    name: "Maximum World Size",
    realName: "max-world-size",
    type: "number",
    info: "The maximum radius that the world border can ever be. Default = 29999984"
  },
  {
    name: "Level Seed",
    realName: "level-seed",
    type: "text",
    info: "The seed used when the server generates a world. Default = none"
  },
];

function renderItems() {
  loadData();
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

function loadData() {
  for ( var i = 0; i < items.length; i++ ) {
    var value = properties.readProperty(items[i].realName);
    if ( items[i].type != "boolean" ) items[i].value = value;
    else items[i].value = (value == "true" || value === true);
  }
}

function saveData() {
  for ( var i = 0; i < items.length; i++ ) {
    properties.setProperty(items[i].realName,items[i].value,true);
  }
  location.href = __dirname + "/../main/index.html";
}

window.onload = renderItems;
