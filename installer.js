var electronInstaller = require('electron-winstaller');
const resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'vxmaker-win32-x64',
    outputDirectory: 'installer',
    loadingGif: 'icon/install_loading.gif',
    authors: 'Altamirasoft Inc.',
    exe: 'vxmaker.exe',
    description: 'vxmaker tool',
    setupIcon: 'icon/icon.ico',
    certificateFile: 'cert/vxmaker.p12',
    certificatePassword: '',
    iconUrl: 'http://beta.vxmaker.com/assets/images/icon.ico'
});
resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));