
var child_process = require('child_process');
var exec = child_process.exec;

exec('./gradlew assembleRelease', function(err,stdout,stderr) {
    if (err) {
        console.log('Child process exited with error code', err.code);
        return
    }
    console.log(stdout);
});

