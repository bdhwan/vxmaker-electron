// installer.js
var createInstaller = require('electron-installer-squirrel-windows');

createInstaller({
    name: 'vxmaker',
    path: '/Users/bdhwan/git/vxmaker/vxmaker-electron/dist/upload/win32',
    out: '/Users/bdhwan/git/vxmaker/vxmaker-electron/dist/upload/out',
    authors: 'Altamirasoft inc.',
    exe: 'angular-electron-install-setup.exe',
    overwrite: true,
    description: 'vxmaker'
}, function done(e) {
    console.log('Build success !!');
});