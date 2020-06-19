/**
 * Interface for renderer process to communicate with main process's Util controller,
 * meant primarily for electron- or OS-specific utilities not available in the
 * renderer process
 */

import { Channels, DirPayload, FilePayload } from '@common/utils';
import { handleRequest } from './request_handler';

export const chooseDirectory = async () => {
  return await handleRequest<DirPayload>(Channels.SELECT_DIR);
};

export const chooseFile = async () => {
  return await handleRequest<FilePayload>(Channels.SELECT_FILE);
};
