const {app, Menu, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const sharp = require('sharp');

const { dialog } = require('electron')

// const dialog = remote.dialog;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {nodeIntegration: true}
  });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  // リリース時は無効化
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("read-image-file-req", (evt, arg) => {
  console.log("read-image-file-req:", arg);
  fs.readFile(arg, (err, data) => {
    if (err) throw err;
    evt.sender.send('read-image-file-resp', data);
  })
});

ipcMain.on("crop-images-req", async (evt, args) => {
  console.log('test-crop-req:', args);
  let datas = await Promise.all(args.map(async arg => {
    return await sharp(arg.filepath)
      .extract({left: arg.x, top: arg.y, width: arg.width, height: arg.height})
      .toBuffer()
  }))
  console.log('promise end')
  datas = datas.map((v, i) => {return {index: i, data: v}})
  evt.sender.send('crop-images-resp', datas);
});

const template = [
  {
    label: 'File',
    submenu: [
      {
        role: 'open',
        label: 'Open...',
        click: async () => {

          // ファイルオープンダイアログを表示する
          const files = dialog.showOpenDialog({
            filters: [
              {name: "Image File", extensions: ["png", "PNG", "jpg", "jpeg", 'JPG', 'JPEG']},
              {name: "All Files", extensions: ["*"]}
            ],
            properties: ["openFile"]
          });


          console.log('files:', files)


          const datas = [
            {id: 0, label: "actor004_l_stand_001_001.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_001.png"},
            {id: 1, label: "actor004_l_stand_001_002.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_002.png"},
            {id: 2, label: "actor004_l_stand_001_003.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_003.png"},
            {id: 3, label: "actor004_l_stand_001_004.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_004.png"},
            {id: 4, label: "actor004_l_stand_001_005.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_005.png"},
            {id: 5, label: "actor004_l_stand_001_006.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_006.png"},
            {id: 6, label: "actor004_l_stand_001_007.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_007.png"},
            {id: 7, label: "actor004_l_stand_001_008.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_008.png"},
          ]

          evt.sender.send('crop-images-resp', datas);
        },
      },
    ]
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
