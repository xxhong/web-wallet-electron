// Modules to control application life and create native browser window
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const os = require('os');
const path = require('path')
const url = require('url')
const ipcMain = electron.ipcMain

let mainWindow

function createWindow () {
    require('electron-context-menu')({
        prepend: (params, browserWindow) => [{
            label: '',
            visible: params.mediaType === 'image'
        }]
    });

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1280, height: 800, webPreferences: {
          nodeIntegration: true,
          show: false
      }})


    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
  // and load the index.html of the app.
  // mainWindow.loadFile('test.html')
  //   mainWindow.loadFile('index.html')
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    // const storage = require('electron-json-storage');
    // const dataPath = storage.getDataPath();
    // console.log("目录："+dataPath);
    //
    // // storage.set('xxhong', { name: 'xxhong' ,age:28}, function(error) {
    // //   if (error) throw error;
    // // });
    // storage.get('xxhong', function(error, data) {
    //   if (error) throw error;
    //
    //   console.log(data);
    // });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})





