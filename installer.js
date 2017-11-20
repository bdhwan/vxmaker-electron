var electronInstaller = require('electron-winstaller');

const resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'dist/vxmaker-win32-x64',
    outputDirectory: 'installer',
    loadingGif: 'template/install_loading.gif',
    authors: 'Altamirasoft Inc.',
    exe: 'vxmaker.exe',
    description: 'vxmaker tool'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));