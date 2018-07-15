var fs = require("fs");
var {exec} = require("child_process");
var proc;

function startCommand() {
  var logBox = document.getElementById("update-log");
  var command;
  var newServer = false;
  if ( fs.existsSync(__dirname + "/../../server/BuildTools.jar") ) {
    command = `cd ${__dirname}/../../server && java -jar BuildTools.jar`;
    document.getElementById("update-text").innerText = "Updating server...";
  } else {
    command = `cd ${__dirname}/../../server && (curl https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar 1> BuildTools.jar) && java -jar BuildTools.jar`;
    document.getElementById("update-text").innerText = "Creating server...";
    newServer = true;
  }
  logBox.value = `$ ${command}\n`;
  proc = exec(command,{maxBuffer: 1024 * 1024},function(err,stdout,stderr) {
    if ( err ) throw err;
  });
  proc.stdout.on("data",function(data) {
    logBox.value += data;
    logBox.scrollTop = logBox.scrollHeight;
  });
  proc.stderr.pipe(proc.stdout);
  proc.on("close",function(code) {
    logBox.value += `Process exited with code ${code}\n`;
    if ( newServer ) {
      fs.writeFileSync(__dirname + "/../../server/eula.txt","eula=true");
      fs.writeFileSync(__dirname + "/../../server/server.properties",`
generator-settings=
op-permission-level=4
allow-nether=true
level-name=world
enable-query=false
allow-flight=false
prevent-proxy-connections=false
server-port=25565
max-world-size=29999984
level-type=DEFAULT
enable-rcon=false
level-seed=
force-gamemode=false
server-ip=
network-compression-threshold=256
max-build-height=256
spawn-npcs=true
white-list=false
spawn-animals=true
hardcore=false
snooper-enabled=true
resource-pack-sha1=
online-mode=true
resource-pack=
pvp=true
difficulty=1
enable-command-block=false
gamemode=0
player-idle-timeout=0
max-players=20
max-tick-time=60000
spawn-monsters=true
view-distance=10
generate-structures=true
motd=A Minecraft Server
ram-alloc=1`);
    }
    location.href = __dirname + "/../main/index.html";
  });
}

window.onload = startCommand;
