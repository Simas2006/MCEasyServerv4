function quitApp() {
  console.log("TODO: send message to main");
}

function openUpdate() {
  if ( confirm("Updating the server may take up to ten minutes. Are you sure you want to continue?") ) {
    location.href = __dirname + "/../update/index.html";
  }
}
