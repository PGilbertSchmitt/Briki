import { app, BrowserWindow } from 'electron';

import { initializeDbService } from './db_service';
import { initializeDbController } from './db_controller';
import { initializeConfigController } from './config_controller';
import { initializeUtilController } from './util_controller';
import { darkTheme } from '@common/theme';

const dbService = initializeDbService();
initializeDbController(dbService);
initializeConfigController(dbService);

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: darkTheme.palette.background.default,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  // Requires parent window for initialization
  initializeUtilController(win);

  // `loadFile` starts relative to the root of the project when running `electron .`
  win.loadFile('dist/index.html');

  // Open the DevTools.
  win.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', async () => {
  
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    await dbService.close();
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
