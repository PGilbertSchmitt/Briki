/**
 * Util controller managed by main
 */

import { dialog, BrowserWindow } from 'electron';
import { Channels, DirPayload } from '@common/utils';
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
};
