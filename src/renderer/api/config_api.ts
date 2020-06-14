/**
 * Interface for renderer process to communicate with main process's config controller
 */

import { Channels, ConfigPayload, IDatabase } from '@common/config';
import { SuccessPayload } from '@common/response';
import { handleRequest } from './request_handler';

export const loadConfig = async () => {
  return await handleRequest<ConfigPayload>(Channels.GET_CONFIG);
};

export const saveNewDB = async (db: IDatabase) => {
  return await handleRequest<SuccessPayload>(Channels.SAVE_DB, db);
};
