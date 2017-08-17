var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
const fs = require('fs');
const path = require('path');




// Create 
function mkdirpath(dirPath) {
    if (!fs.existsSync(dirPath)) {
        try {
            fs.mkdirSync(dirPath);
        } catch (e) {
            mkdirpath(path.dirname(dirPath));
            mkdirpath(dirPath);
        }
    }
}


var rmdir = function(dir) {
    if (!fs.existsSync(dir)) {
        var list = fs.readdirSync(dir);
        for (var i = 0; i < list.length; i++) {
            var filename = path.join(dir, list[i]);
            var stat = fs.statSync(filename);

            if (filename == "." || filename == "..") {
                // pass these files
            } else if (stat.isDirectory()) {
                // rmdir recursively
                rmdir(filename);
            } else {
                // rm fiilename
                fs.unlinkSync(filename);
            }
        }
        fs.rmdirSync(dir);
    }

};

try {
    console.log("will remove");
    rmdir(__dirname + "/dist/upload");

} catch (error) {
    console.log("rm error = " + error);
}

try {
    console.log("will make");
    mkdirpath(__dirname + "/dist/upload");

} catch (error) {
    console.log("mk error = " + error);
}




const targetPath = new Date().toLocaleString() + "_win32.zip";
console.log("targetPath =" + targetPath);

fs.renameSync(__dirname + "/dist/win32.zip", __dirname + "/dist/upload/" + targetPath);


var config = {
    username: "altamirashare",
    password: "kse!1204", // optional, prompted if none given 
    host: "192.168.0.11",
    port: 21,
    localRoot: __dirname + "/dist/upload",
    remoteRoot: "/home/vxmaker/",
    include: [targetPath],
    exclude: ['dist/*', 'adb', '.idea', 'tmp/*', 'build/*']
}



ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('finished');
});