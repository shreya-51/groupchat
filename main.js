const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // Pointing to the preload script
    }
  });

  win.loadFile('index.html');
}

// Handle message from renderer process
ipcMain.handle('run-python-script', (event, scriptName, message) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [scriptName, message]);

    pythonProcess.stdout.on('data', (data) => {
      resolve(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
      reject(data.toString());
    });
  });
});

app.whenReady().then(createWindow);
