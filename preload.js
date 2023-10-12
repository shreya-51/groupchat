const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', { // Exposed API for renderer process
    runPythonScript: async (scriptName, message) => {
      return ipcRenderer.invoke('run-python-script', scriptName, message);
    }
  }
);
