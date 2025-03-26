import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // In development, load from localhost:3001
  // In production, load from the build directory
  const isDev = process.env.NODE_ENV === 'development';
  console.log('Running in', isDev ? 'development' : 'production', 'mode');
  
  if (isDev) {
    console.log('Loading from localhost:3001');
    win.loadURL('http://localhost:3001');
    win.webContents.openDevTools();
  } else {
    const webPath = path.join(__dirname, '../../web/out/index.html');
    console.log('Loading from', webPath);
    win.loadFile(webPath);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
