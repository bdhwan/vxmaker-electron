// src/electron.js

const { app, dialog, shell, Menu, autoUpdater, Tray, BrowserWindow, ipcMain } = require('electron')
if (require('electron-squirrel-startup')) app.quit();

var path = require("path");
const url = require('url');
var fse = require('fs-extra');
var mkdirp = require('mkdirp');
var beautify = require('js-beautify').js_beautify;
var ElectronData = require('electron-data');
var adb = require('adbkit')
var sizeOf = require('image-size');
var tar = require('tar');
var fstream = require("fstream");
var Promise = require('bluebird');
var PsdUtil = require('./psd-util.js');
const isDev = require('electron-is-dev');

var settings = new ElectronData({
    path: app.getPath('userData'),
    filename: 'settings_v4'
});


let macAddress = getRandMac();

require('getmac').getMac(function(err, _macAddress) {
    if (!err) {
        macAddress = _macAddress;
    }
});


function getRandMac() {
    var result = settings.get("mac");
    if (!result) {
        result = 'no-mac-' + new Date().getTime();
        settings.set("mac", result);
    }
    return result;
}



const server = 'http://update.vxmaker.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`


//adb 관련
var client;
var deviceList;
var adbFilePath;

if (isDev) {
    console.log('Running in development');
} else {


}


function startUpdateCheck() {
    setInterval(() => {
        // console.log('will check update');
        autoUpdater.checkForUpdates();
    }, 60000);

    // autoUpdater.on('checking-for-update', (event, temp) => {
    //     // showMessage('checking-for-update', 'checking-for-update' + event);
    // });

    // autoUpdater.on('update-available', (event, temp) => {
    //     // showMessage('update-available', 'update-available' + event);
    // });

    // autoUpdater.on('update-not-available', (event, temp) => {
    //     // showMessage('update-not-available', 'update-not-available' + event);
    // });

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
        const dialogOpts = {
            type: 'info',
            buttons: ['Restart', 'Later'],
            title: 'Application Update',
            detail: 'A new version has been downloaded. Restart the application to apply the updates.'
        }
        dialog.showMessageBox(dialogOpts, (response) => {
            if (response === 0) autoUpdater.quitAndInstall()
        })
    });

    // autoUpdater.on('error', message => {
    //     console.error('There was a problem updating the application')
    //     console.error(message)
    //         // showMessage('error', message);
    // });

    autoUpdater.setFeedURL(feed);
    // autoUpdater.checkForUpdates();
}

function showMessage(title, message) {
    const dialogOpts = {
        type: 'info',
        buttons: ['Ok'],
        title: title,
        message: message,
        detail: message
    }
    dialog.showMessageBox(dialogOpts, (response) => {

    });

}

function checkVersionDialog() {
    const dialogOpts = {
        type: 'info',
        buttons: ['Ok'],
        title: 'version check',
        message: 'check',
        detail: feed + ', ' + isDev
    }
    dialog.showMessageBox(dialogOpts, (response) => {

    });
}





// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
})









//change window size and resizable 
// ipcMain.on('change-window', (event, width, height, resizable) => {
//     win.setSize(width, height, true);
//     win.setResizable(resizable);
//     event.returnValue = 'done';
// })



//get recent project list
ipcMain.on('get-recent-project-list', (event, arg) => {
    event.returnValue = getRecentProjectList();
})


//get recent project list
ipcMain.on('remove-recent-project-list', (event, arg) => {
    removeRecentProjectList(arg);
    event.returnValue = true;
})

//select psd
ipcMain.on('select-psd-file', (event, arg) => {
    console.log(arg) // prints "ping"

    var files = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'PSD', extensions: ['psd', 'PSD'] }
        ]
    });
    if (files) {
        var file = files[0];
        event.returnValue = file;

    } else {
        event.returnValue = null;
    }
})

//parse psd
ipcMain.on('parse-psd', (event, psdFilePath, applicationFolderPath) => {
    const psdUtil = new PsdUtil();
    const self = this;
    psdUtil.parsePSD(psdFilePath, applicationFolderPath).then(function(result) {
        console.log("will return to web = " + result);
        event.sender.send('parse-psd-result', result);
        console.log("done return to web = " + result);
    });
    event.returnValue = true;
})



function getRecentProjectList() {
    var result = settings.get("recent-project-list");
    if (!result) {
        result = [];
    }
    return result;
}

//add recent project list
function addRecentProjectList(historyData) {
    var result = settings.get("recent-project-list");
    if (!result) {
        result = [];
    } else {
        for (var i = 0; i < result.length; i++) {
            var aHistory = result[i];
            if (aHistory.applicationFolderPath == historyData.applicationFolderPath) {
                result.splice(i, 1);
                break;
            }
        }
    }
    result.unshift(historyData);
    settings.set("recent-project-list", result);
    settings.save();
}

//remove recent project list
function removeRecentProjectList(historyData) {
    var result = settings.get("recent-project-list");
    if (!result) {
        result = [];
    } else {
        for (var i = 0; i < result.length; i++) {
            var aHistory = result[i];
            if (aHistory.applicationFolderPath == historyData.applicationFolderPath) {
                result.splice(i, 1);
                break;
            }
        }
    }
    settings.set("recent-project-list", result);
    settings.save();
}

//get workspace folder
ipcMain.on('get-workspace-folder-path', (event, arg) => {
    var result = settings.get("workspace-folder");
    console.log("result = " + result);
    if (!result) {
        result = app.getPath('desktop');
        console.log("documents  = " + result);
    }
    event.returnValue = result;
})


ipcMain.on('check-empty-folder', (event, arg) => {

    event.returnValue = result;
})



ipcMain.on('get-export-folder-path', (event, arg) => {
    var result = settings.get("export-folder");
    console.log("result = " + result);
    if (!result) {
        result = app.getPath('desktop');
        console.log("documents  = " + result);
    }
    event.returnValue = result;
})

ipcMain.on('set-workspace-folder-path', (event, workspaceFolderPath) => {
    settings.set("workspace-folder", workspaceFolderPath);
    settings.save();
    event.returnValue = true;
})


//select workspace folder
ipcMain.on('select-workspace-folder-path', (event, beforePath) => {
    console.log("select-workspace-folder-path = " + JSON.stringify(beforePath));

    var folder = dialog.showOpenDialog({
        defaultPath: beforePath,
        title: 'Project Folder',
        properties: ['openDirectory']
    });
    if (folder) {
        event.returnValue = folder[0];
    } else {
        event.returnValue = null;
    }
})


//make application folder
ipcMain.on('capture-screen', (event, x, y, width, height, filePath) => {
    console.log("will capture - " + x + ", " + y + ", " + width + ", " + height + ", " + filePath);


    let captureRect = {
        x: x,
        y: y,
        width: width,
        height: height
    };


    win.capturePage(captureRect, (img) => {
        console.log("image size: ", img.getSize());
        let jpgFile = img.toJPEG(100);

        fse.writeFile(filePath, jpgFile, function(err) {
            if (err) {
                console.log("err capture = " + JSON.stringify(err));
            } else {
                console.log("done save capture = " + filePath);
            }
            event.sender.send('capture-screen-result', filePath);
        });
        // save file as testSetViewSize.jpg, I used jetpack.writeAsync
    });


    // console.log("will capture - " + x + ", " + y + ", " + width + ", " + height + ", " + filePath);
    // screenshot({
    //         x: x,
    //         y: y,
    //         width: width,
    //         height: height
    //     })
    //     .then(function(img) {
    //         fs.writeFile(filePath, img.data, function(err) {
    //             if (err) {
    //                 console.log("err capture = " + JSON.stringify(err));
    //             } else {
    //                 console.log("done save capture = " + filePath);
    //             }
    //             screenshot.close();
    //             event.sender.send('capture-screen-result', filePath);
    //         });
    //     });
})




//make application folder
ipcMain.on('make-folder', (event, folder) => {
    mkdirp.sync(folder);
    event.returnValue = folder;
})


//open url external browser
ipcMain.on('open-url', (event, url) => {

    console.log("will open url =" + url);

    const result = shell.openExternal(url);

    console.log("will open result =" + result);
    event.returnValue = true;
})

//open url external browser
ipcMain.on('open-finder', (event, path) => {

    shell.showItemInFolder(path);
    event.returnValue = true;
})




//file check
function haveFileWithPath(filePath) {
    return fse.existsSync(filePath);
}


//add recent list
ipcMain.on('add-recent-project', (event, historyData) => {
    addRecentProjectList(historyData);
    event.returnValue = true;
})



//add recent list
ipcMain.on('open-application', (event) => {
    var folder = dialog.showOpenDialog({
        defaultPath: app.getPath('desktop'),
        properties: ['openDirectory']
    });
    console.log("folder =" + folder);
    if (folder) {
        event.returnValue = folder[0];
    } else {
        event.returnValue = null;
    }
})


//save activity data
ipcMain.on('save-file-data', (event, filePath, data) => {
        fse.writeFileSync(filePath, beautify(JSON.stringify(data), { indent_size: 4 }), 'utf-8');
        event.returnValue = true;
    })
    //save activity data
ipcMain.on('write-file-data', (event, filePath, data) => {
    fse.writeFileSync(filePath, data, 'utf-8');
    event.returnValue = true;
})

//save image data
ipcMain.on('save-raw-data', (event, filePath, data) => {
    console.log('will save raw data = ' + data);

    var data = data.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    // fs.writeFile('image.png', buf);

    fse.writeFile(filePath, buf, 'binary', function(err) {
        if (err) throw err
        console.log('File saved.')
    })
    event.returnValue = true;
})


//read activity data
ipcMain.on('read-file-data', (event, filePath) => {
    var target = filePath;
    if (haveFileWithPath(target)) {
        event.returnValue = fse.readJsonSync(target);
    } else {
        event.returnValue = null;
    }
})


//select image
ipcMain.on('select-image-file', (event, arg) => {
    console.log(arg) // prints "ping"

    var files = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Images', extensions: ['png', 'jpeg', 'jpg', 'bmp'] }
        ]
    });


    if (files) {
        var file = files[0];
        event.returnValue = file;
        // var result = sizeOf(file);
        // var realPath = workspace + "/images/" + fileName;

        // fse.copySync(file, realPath);

        // result.filePath = "images/" + fileName;
        // promise.resolve(result);

    } else {
        event.returnValue = null;
    }
})

//select image
ipcMain.on('select-image-files', (event, arg) => {
    console.log(arg) // prints "ping"

    var files = dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [
            { name: 'Images', extensions: ['png', 'jpeg', 'jpg', 'bmp'] }
        ]
    });


    if (files) {
        event.returnValue = files;
    } else {
        event.returnValue = null;
    }
})



//select image
ipcMain.on('select-file', (event, arg) => {
        console.log(arg) // prints "ping"

        var files = dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: 'Files', extensions: ['*'] }
            ]
        });


        if (files) {
            var file = files[0];
            event.returnValue = file;
            // var result = sizeOf(file);
            // var realPath = workspace + "/images/" + fileName;

            // fse.copySync(file, realPath);

            // result.filePath = "images/" + fileName;
            // promise.resolve(result);

        } else {
            event.returnValue = null;
        }
    })
    //select image
ipcMain.on('select-files', (event, arg) => {
        console.log(arg) // prints "ping"

        var files = dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Files', extensions: ['*'] }
            ]
        });


        if (files) {
            event.returnValue = files;
        } else {
            event.returnValue = null;
        }
    })
    //select image
ipcMain.on('select-files-with-type', (event, fileType) => {
        console.log(fileType) // prints "ping"

        var files = dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Files', extensions: [fileType] }
            ]
        });
        if (files) {
            event.returnValue = files;
        } else {
            event.returnValue = null;
        }
    })
    //copy folder
ipcMain.on('copy-folder', (event, src, dst) => {
    console.log(src + ", " + dst);
    fse.copySync(src, dst);
    event.returnValue = true;
})

//copy folder from root
ipcMain.on('copy-folder-from-root', (event, src, dst) => {
        console.log(src + ", " + dst);
        fse.copySync(__dirname + src, dst);
        event.returnValue = true;
    })
    //copy folder from root
ipcMain.on('copy-file-from-root', (event, src, dst) => {
    console.log(src + ", " + dst);
    fse.copySync(__dirname + src, dst);
    event.returnValue = true;
})



ipcMain.on('have-file', (event, path) => {
    console.log("have file = " + path);
    try {
        event.returnValue = fse.lstatSync(path).isDirectory();
    } catch (e) {
        event.returnValue = false;
    }
})


//copy file
ipcMain.on('get-mac-address', (event) => {
    // Fetch the computer's mac address 
    event.returnValue = macAddress;
})

//copy file
ipcMain.on('copy-file', (event, src, dst) => {
    console.log(src + ", " + dst);
    fse.copySync(src, dst);
    event.returnValue = true;
})


//delete file
ipcMain.on('delete-file', (event, file) => {
    fse.removeSync(file);
    event.returnValue = true;
})

//copy file
ipcMain.on('copy-from-root-file', (event, src, dst) => {
    var from = __dirname + "/" + src;
    fse.copySync(from, dst);
    event.returnValue = true;
})


//get file list
ipcMain.on('get-file-list', (event, path) => {
    console.log("will read path = " + path);
    if (fse.existsSync(path)) {
        console.log("hav list");
        event.returnValue = fse.readdirSync(path);
    } else {
        console.log("no hav list");
        event.returnValue = [];
    }
})

//get file list
ipcMain.on('get-image-size', (event, path) => {
    if (fse.existsSync(path)) {
        event.returnValue = sizeOf(path);
    } else {
        event.returnValue = null;
    }
})


// send file
ipcMain.on('tar-folder', (event, folderPath) => {

    // console.log("will tar = " + folderPath);

    var filePath = getTempFolder() + "/temp.tar";

    var dirDest = fse.createWriteStream(filePath);
    // console.log("makeNew3");

    var packer = tar.Pack({ noProprietary: true })
        .on('error', function(err) {
            // console.log("err2=" + JSON.stringify(err));
            event.returnValue = false;
        })
        .on('end', function() {
            // console.log("makeNew5=" + folderPath);
            // console.log("makeNew6 will resolve=" + filePath);
            event.returnValue = filePath;
        });

    fstream.Reader({ path: folderPath, type: "Directory" })
        .on('error', function(err) {
            // console.log("err1=" + JSON.stringify(err));
            event.returnValue = false;
        })
        .pipe(packer)
        .pipe(dirDest)
    console.log("makeNew4");

})


// send file
ipcMain.on('send-file-to-device', (event, tarFilePath, deviceId, devicePath) => {

    // console.log("will send file to device = " + tarFilePath);
    // console.log("deviceId = " + deviceId);
    // console.log("devicePath = " + devicePath);

    client.push(deviceId, tarFilePath, devicePath)
        .then(function(transfer) {
            return new Promise(function(resolve, reject) {
                transfer.on('progress', function(stats) {
                    console.log('[%s] Pushed %d bytes so far',
                        deviceId,
                        stats.bytesTransferred)
                })
                transfer.on('end', function() {
                    console.log('[%s] Push complete', deviceId)
                    resolve()
                })
                transfer.on('error', reject)
            })
        })
        .then(function() {
            console.log("done!");
            event.returnValue = true;
        })
        .catch(function(err) {
            console.error('Something went wrong:', err.stack)
            event.returnValue = false;
        });
});


// check isntalled
ipcMain.on('is-installed-apk', (event, packageName, deviceId) => {

    // console.log("is-installed-apk = " + packageName);
    // console.log("deviceId = " + deviceId);


    client.isInstalled(deviceId, packageName)
        .then(result => {
            console.log("done! = " + result);
            event.sender.send('is-installed-result', result);
        })
        .catch(function(err) {
            console.error('Something went wrong:', JSON.stringify(err));
            event.sender.send('is-installed-result', false);
        });
});

//install apk
ipcMain.on('install-apk', (event, targetFilePath, deviceId) => {

    // console.log("install-apk = " + targetFilePath);
    // console.log("deviceId = " + deviceId);


    client.install(deviceId, __dirname + '/' + targetFilePath)
        .then(result => {
            console.log("install done! = " + result);
            event.sender.send('installed-result', result);
        })
        .catch(function(err) {
            console.error('Something went wrong:', JSON.stringify(err));
            event.sender.send('installed-result', false);
        });
});


//start activity
ipcMain.on('start-activity', (event, option, deviceId) => {

    // console.log("start activity = " + option);
    // console.log("deviceId = " + deviceId);
    client.startActivity(deviceId, option)
        .then(result => {
            // console.log("install done! = " + result);
            event.returnValue = result;
        })
        .catch(function(err) {
            // console.error('Something went wrong:', JSON.stringify(err));
            event.returnValue = false;
        });
});

function getTempFolder() {
    return app.getPath('temp');

}

//start activity
ipcMain.on('read-heart-beat', (event, filePath, deviceId) => {



    // console.log("start activity = " + filePath);
    // console.log("deviceId = " + deviceId);
    // console.log("target path = " + filePath);
    client.pull(deviceId, filePath)
        .then(function(transfer) {
            return new Promise(function(resolve, reject) {
                var fn = getTempFolder() + '/' + deviceId + '_temp.txt';
                console.log('path = ' + fn);
                transfer.on('progress', function(stats) {
                    console.log('[%s] Pulled %d bytes so far', deviceId, stats.bytesTransferred)
                })
                transfer.on('end', function() {
                    console.log('[%s] Pull complete', fse.readFileSync(fn, "utf8"));
                    resolve(fse.readFileSync(fn, "utf8"));
                })
                transfer.on('error', function(error) {
                    console.log("error = " + error);
                    reject(error);
                })
                transfer.pipe(fse.createWriteStream(fn))
            })
        })
        .then(result => {
            console.log("install done! = " + result);
            event.sender.send('heart-beat-result', JSON.parse(result));
        })
        .catch(function(err) {
            console.error('Something went wrong:', JSON.stringify(err));
            event.sender.send('heart-beat-result', false);
        });
});




function createWindow() {


    const initWidth = 1024;
    const initHeight = 720;

    const minWidth = 700;
    const minHeight = 600;



    if (isDev) {
        setTimeout(() => {
            // Create the browser window.
            win = new BrowserWindow({ width: initWidth, height: initHeight, minWidth: minWidth, minHeight: minHeight });

            var targetUrl = url.format({ pathname: 'localhost:4200', protocol: 'http:', slashes: true });
            // var targetUrl = url.format({ pathname: 'localhost:4200', protocol: 'http:', slashes: true })

            win.loadURL(targetUrl)
            if (isDev) {
                win.webContents.openDevTools();
            }

            // Emitted when the window is closed.
            win.on('closed', () => {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                win = null
            })

            // checkVersionDialog();
               startUpdateCheck();
            registADB();
        }, 12000)
    } else {
        // Create the browser window.
        win = new BrowserWindow({ width: initWidth, height: initHeight, minWidth: minWidth, minHeight: minHeight });

        var targetUrl = `file://${__dirname}/index.html`;
        // var targetUrl = url.format({ pathname: 'localhost:4200', protocol: 'http:', slashes: true })
        // and load the index.html of the app.
        win.loadURL(targetUrl)
            // Emitted when the window is closed.
        win.on('closed', () => {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                win = null
            })
            // checkVersionDialog();
        startUpdateCheck();
        registADB();
    }


}







// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//adb 관련 
var deviceListener;

function registADB() {
    ipcMain.on('get-device-list', (event) => {
        event.returnValue = deviceList;
    })

    ipcMain.on('regist-device-connect-status', (event, arg) => {
        // console.log(arg) // prints "ping"
        deviceListener = event;
        event.returnValue = true;
    });

    ipcMain.on('unregist-device-connect-status', (event, arg) => {
        // console.log(arg) // prints "ping"
        deviceListener = null;
        event.returnValue = true;
    });


    ipcMain.on('get-file-name-base', (event, filePath) => {
        console.log("get-file-name-base = " + filePath);

        event.returnValue = path.parse(filePath).base;
    });

    ipcMain.on('get-file-name', (event, filePath) => {
        console.log("get-file-name = " + filePath);

        event.returnValue = path.parse(filePath).name;
    });

    ipcMain.on('get-file-ext', (event, filePath) => {
        console.log("get-file-ext = " + filePath);

        event.returnValue = path.parse(filePath).ext;
    });



    //개발버전 adb 경로
    adbFilePath = __dirname + "/adb/adb";

    // 프로덕션 버전에서 adb 경로
    // var adbFilePath = app.getAppPath() + "/adb/adb";
    client = adb.createClient({ bin: adbFilePath });
    deviceList = [];
    client.trackDevices()
        .then(function(tracker) {
            tracker.on('add', function(device) {
                console.log('Device %s was plugged in', device.id)
                console.log('device ' + JSON.stringify(device))
                deviceList.push(device.id);
                console.log('deviceList = ', deviceList.length);
                if (deviceListener) {
                    deviceListener.sender.send('device-status', 'add');
                }
            })
            tracker.on('remove', function(device) {
                console.log('Device %s was unplugged', device.id)
                var index = deviceList.indexOf(device.id); // <-- Not supported in <IE9
                if (index !== -1) {
                    deviceList.splice(index, 1);
                }
                console.log('deviceList = ', deviceList.length);
                if (deviceListener) {
                    deviceListener.sender.send('device-status', 'remove');
                }

            })
            tracker.on('end', function() {
                console.log('Tracking stopped')
            })
        })
        .catch(function(err) {
            console.error('Something went wrong:', err.stack)
        });
}