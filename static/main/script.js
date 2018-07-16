var {shell} = require("electron");

function openUpdate() {
  if ( confirm("Updating the server may take up to ten minutes. Are you sure you want to continue?") ) {
    location.href = __dirname + "/../update/index.html";
  }
}

function openDirectory() {
  shell.openItem(__dirname + "/../../server");
}
