var {shell} = require("electron");

function openEULA() {
  shell.openExternal("https://account.mojang.com/documents/minecraft_eula");
}

function openInstall() {
  location.href = __dirname + "/../update/index.html";
}

function quitApp() {
  window.close();
}
