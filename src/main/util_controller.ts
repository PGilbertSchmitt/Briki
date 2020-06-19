/**
 * Util controller managed by main
 */

import { dialog, BrowserWindow } from 'electron';
import { Channels, DirPayload, FilePayload } from '@common/utils';
import { registerHandler } from './response_handler';

export const initializeUtilController = (parent: BrowserWindow) => {
  console.log('Initializing utils...');

  registerHandler(Channels.SELECT_DIR, async (): Promise<DirPayload> => {
    const dir = await dialog.showOpenDialog(parent, {
      properties: [ 'openDirectory' ]
    });

    return {
      success: true,
      dir: dir.filePaths[0],
    };
  });

  registerHandler(Channels.SELECT_FILE, async (): Promise<FilePayload> => {
    const file = await dialog.showOpenDialog(parent, {
      properties: [ 'openFile' ],
      filters: [
        { name: 'SQLite File', extensions: [ 'sqlite' ] },
        { name: 'Briki File', extensions: [ 'briki' ] },
        { name: 'All Files', extensions: [ '*' ] }
      ],
    });

    return {
      success: true,
      file: file.filePaths[0],
    };
  });
};
