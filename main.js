const { app, BrowserWindow } = require('electron')
const electron = require('electron')
const {ipcMain} = require('electron')
const { ipcRenderer } = require('electron')
console.log('main.js')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var app2 = require('express')();
var server = require('http').Server(app2);
var io = require('socket.io')(server);
var nationalID;
var ip;

server.listen(5000);
// WARNING: app.listen(80) will NOT work here!

io.on('connection', (socket)=>{
  socket.on('gg',(input)=>{
    console.log(input)
    nationalID = input;
  })
  socket.on('ip',(input)=>{
    ip=input;
    console.log(ip)
  })
  win.webContents.send('forWin1',nationalID,ip);
  console.log('connected')
  
});
  ipcMain.on('message', (event, arg1) => {
    //io.emit('news', arg1);
    console.log(arg1);
    event.returnValue = null
  })
   ipcMain.on('checkID', (event, arg2) => {
    io.emit('checkID', arg2);
    console.log(arg2);
    event.returnValue = null
})



let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // and load the index.html of the app.
  win.loadFile('src/index.html')

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

