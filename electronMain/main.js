const path = require('path')
const { app, BrowserWindow, Menu, ipcMain } = require('electron')

const isDev = process.env.NODE_ENV === 'development'
let mainWindow
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  console.log('isDev', isDev)
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
  } else {
    // Menu.setApplicationMenu(null)
    mainWindow.loadFile(path.join(__dirname, '../../build', 'index.html'))
  }

  // 获取打印机列表
  ipcMain.handle('getPrinter', () => {
    return mainWindow.webContents.getPrintersAsync()
  })
}
const noFirstInstance = app.requestSingleInstanceLock()
if (!noFirstInstance) {
  app.quit()
} else {
  app.whenReady().then(() => {
    createWindow()
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  app.on('second-instance', () => {
    if (mainWindow) {
      mainWindow.focus()
    }
  })
}
