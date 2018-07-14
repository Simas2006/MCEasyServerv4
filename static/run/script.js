var fs = require("fs");
var {exec} = require("child_process");
var proc;
var playerList = [];
var stopIntended = false;

function startServer() {
  document.getElementById("server-players").value = "[Players]\nNone";
  var logBox = document.getElementById("server-log");
  fs.readdir(`${__dirname}/../../server`,function(err,files) {
    if ( err ) throw err;
    files = files.filter(item => item.startsWith("spigot-") && item.endsWith(".jar"));
    if ( files.length <= 0 ) throw new Error("No usable JAR file");
    proc = exec(`cd ${__dirname}/../../server && java -jar -Xms1G -Xmx1G ${files[0]}`,function(err,stdout,stderr) {
      if ( err ) throw err;
    });
    proc.stdout.on("data",function(data) {
      handlePlayers(data.toString());
      logBox.value += data;
      logBox.scrollTop = logBox.scrollHeight;
    });
    proc.stderr.pipe(proc.stdout);
    proc.on("close",function(code) {
      logBox.value += `Process exited with code ${code}\n`;
      if ( ! stopIntended ) alert("The server has stopped running.");
      location.href = __dirname + "/../main/index.html";
    });
  });
}

function sendCommand(command) {
  if ( command.startsWith("stop") ) stopIntended = true;
  var logBox = document.getElementById("server-log");
  logBox.value += `[INPUT]> ${command}\n`;
  proc.stdin.write(command + "\n");
}

function recieveCommand() {
  var inputBox = document.getElementById("server-command");
  if ( event.code == "Enter" ) {
    sendCommand(inputBox.value);
    inputBox.value = "";
  }
}

function handlePlayers(message) {
  var rerender = false;
  message = message.slice(17);
  if ( message.indexOf(" logged in with entity id ") > -1 ) {
    message = message.slice(0,message.indexOf("["));
    playerList.push(message);
    rerender = true;
  } else if ( message.endsWith(" left the game\n") ) {
    message = message.slice(0,message.indexOf(" left the game"));
    playerList = playerList.filter(item => item != message);
    rerender = true;
  }
  if ( rerender ) {
    var playerBox = document.getElementById("server-players");
    playerBox.value = "[Players]\n";
    if ( playerList <= 0 ) playerBox.value += "None";
    for ( var i = 0; i < playerList.length; i++ ) {
      playerBox.value += playerList[i] + "\n"
    }
  }
}

window.onload = startServer;
