/**
 * Interface for renderer process to communicate with main process's DB controller
 */

import { Channels } from '@common/db';
import { handleRequest } from './request_handler';

export const loadDb = async (dbName: string) => {
  return await handleRequest(Channels.LOAD_DB, dbName);
};

export const closeDb = async () => {
  return await handleRequest(Channels.CLOSE_DB);
};
