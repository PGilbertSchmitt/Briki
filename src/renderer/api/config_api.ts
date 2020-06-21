/**
 * Interface for renderer process to communicate with main process's config controller
 */

import { Channels, ConfigPayload, IDatabase } from '@common/config';
import { handleRequest } from './request_handler';

export const loadConfig = async () => {
  return await handleRequest<ConfigPayload>(Channels.GET_CONFIG);
};

export const saveNewDB = async (db: IDatabase) => {
  return await handleRequest(Channels.SAVE_DB, db);
};

export const registerDb = async (db: IDatabase) => {
  return await handleRequest(Channels.REGISTER_DB, db);
};

export const removeDb = async (filename: string) => {
  return await handleRequest(Channels.REMOVE_DB, filename);
};
