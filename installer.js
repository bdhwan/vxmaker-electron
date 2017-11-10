
var electronInstaller = require('electron-winstaller');

const resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'win32',
    outputDirectory: 'installer',
    authors: 'Altamirasoft Inc.',
    exe: 'vxmaker.exe',
    description:'vxmaker tool'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));


