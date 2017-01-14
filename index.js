/**
 * Created by mark on 1/13/17.
 */
// import electron from 'electron';
const electron = require("electron")
// Module to control application life.
const {app, Menu, Tray} = electron
const ipc = electron.ipcMain
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const notifier = require("node-notifier")

notifier.notify({
    'title': 'WebCook Electron',
    'message': 'This is a sample notification',
    'icon': path.join(__dirname, 'logo.png')
});

function sampleNotification() {
    notifier.notify({
        'title': 'Thanks for loging in..',
        'message': 'This is a sample notification',
        'icon': path.join(__dirname, 'logo.png')
    })
}

ipc.on('sample-notification', sampleNotification);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray = null

function systemTray() {
    tray = new Tray('logo.png')
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Item1', type: 'radio'},
        {label: 'Item2', type: 'radio'},
        {label: 'Item3', type: 'radio', checked: true},
        {label: 'Item4', type: 'radio'}
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
}

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({icon: 'Javascript-50.png', width: 600, height: 600})

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'web/login.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('ready', systemTray)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
