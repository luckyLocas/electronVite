const { contextBridge, ipcRenderer } = require('electron')

// 在全局window对象中拓展新的electronMain属性
contextBridge.exposeInMainWorld('electronMain', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  getPrinter: () => ipcRenderer.invoke('getPrinter'),
})
