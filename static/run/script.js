var fs = require("fs");
var {exec} = require("child_process");
var proc;

function startServer() {
  var logbox = document.getElementById("server-log");
  fs.readdir(`${__dirname}/../../server`,function(err,files) {
    if ( err ) throw err;
    files = files.filter(item => item.startsWith("spigot-") && item.endsWith(".jar"));
    if ( files.length <= 0 ) throw new Error("No usable JAR file");
    proc = exec(`cd ${__dirname}/../../server && java -jar -Xms1G -Xmx1G ${files[0]}`,function(err,stdout,stderr) {
      if ( err ) throw err;
    });
    proc.stdout.on("data",function(data) {
      logbox.value += data;
      logbox.scrollTop = logbox.scrollHeight;
    });
    proc.stderr.pipe(proc.stdout);
  });
}

window.onload = startServer;
