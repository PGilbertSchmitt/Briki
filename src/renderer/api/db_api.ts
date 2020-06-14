/**
 * Interface for renderer process to communicate with main process's DB controller
 */

import { Channels } from '@common/db';
import { SuccessPayload } from '@common/response';
import { handleRequest } from './request_handler';

export const loadDb = async (dbName: string) => {
  return await handleRequest<SuccessPayload>(Channels.LOAD_DB, dbName);
};

export const closeDb = async () => {
  return await handleRequest<SuccessPayload>(Channels.CLOSE_DB);
};

// Where T is the shape of the successful result
export const executeQuery = async <T>(query: string) => {
  return await handleRequest<T>(Channels.EXE_QUERY, query);
};
