/**
 * Interface for renderer process to communicate with main process's wiki controller
 */

import { Channels, ITreePayload, IFilePayload } from '@common/wiki';
import { handleRequest } from './request_handler';

export const loadTree = async (folderPath: string) => {
  return await handleRequest<ITreePayload>(Channels.LOAD_TREE, folderPath);
};

export const loadFile = async (filePath: string) => {
  return await handleRequest<IFilePayload>(Channels.LOAD_FILE, filePath);
};
