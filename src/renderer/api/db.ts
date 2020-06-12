/**
 * Interface for renderer process to communicate with main process's DB service
 */

import { ipcRenderer } from 'electron';
import { Channels, SuccessPayload } from '@common/db';

export const loadDb = async (dbName: string) => {
  return (await ipcRenderer.invoke(Channels.LOAD_DB, dbName)) as SuccessPayload;
};

export const closeDb = async () => {
  return (await ipcRenderer.invoke(Channels.CLOSE_DB)) as SuccessPayload;
};

export const executeQuery = async <T>(query: string) => {
  return (await ipcRenderer.invoke(Channels.EXE_QUERY, query)) as T;
};
