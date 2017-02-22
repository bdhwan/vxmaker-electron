// src/electron.js

const { app, dialog, shell, Menu, Tray, BrowserWindow, ipcMain } = require('electron')
var path = require("path");
const url = require('url');
var fse = require('fs-extra');
var mkdirp = require('mkdirp');
var beautify = require('js-beautify').js_beautify;
var ElectronData = require('electron-data');


var settings = new ElectronData({
    path: app.getPath('userData'),
    filename: 'settings_v3'
});

console.log("userDatapath = " + app.getPath('userData'));



let minWidth = 800;
let minHeight = 600;
let maxWidth = 800;
let maxHeight = 600;

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
ipcMain.on('change-window', (event, width, height, resizable) => {
    win.setSize(width, height, true);
    win.setResizable(resizable);
    event.returnValue = 'done';
})

//get recent project list
ipcMain.on('get-recent-project-list', (event, arg) => {
    event.returnValue = getRecentProjectList();
})


//get recent project list
ipcMain.on('remove-recent-project-list', (event, arg) => {
    removeRecentProjectList(arg);
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
// ipcMain.on('make-application-folder', (event, workspaceFolderPath, applicationName) => {
//     var resultPath = workspaceFolderPath + "/" + applicationName;
//     fse.removeSync(resultPath);
//     mkdirp.sync(resultPath);
//     mkdirp.sync(resultPath + "/activity");
//     mkdirp.sync(resultPath + "/image");
//     mkdirp.sync(resultPath + "/export");

//     settings.set("workspace-folder", workspaceFolderPath);
//     settings.save();


//     var now = new Date().getTime();
//     var filePath = resultPath + "/app.json";
//     var data = {
//         createdAt: now,
//         updatedAt: now,
//         applicationName: applicationName,
//         activityList: []
//     }
//     fse.writeFileSync(filePath, beautify(JSON.stringify(data), { indent_size: 4 }), 'utf-8');
//     event.returnValue = resultPath;
// })


//make application folder
ipcMain.on('make-folder', (event, folder) => {
    mkdirp.sync(folder);
    event.returnValue = folder;
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

//copy file
ipcMain.on('copy-file', (event, src, dst) => {
    console.log(src + ", " + dst);
    fse.copySync(src, dst);
    event.returnValue = true;
})







function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })

    // and load the index.html of the app.
    var url = `file://${__dirname}/index.html`;


    console.log("url = " + url);
    win.loadURL(url);

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
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