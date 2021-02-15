/**
 * Interface for renderer process to communicate with main process's DB controller
 */

import { Channels } from '@common/db';
import { handleRequest } from './request_handler';
import { createPage, updatePage, getPage, getAllPatches, getPageIndex } from './query_api';

export const loadDb = async (dbName: string) => {
  return await handleRequest(Channels.LOAD_DB, dbName);
};

export const closeDb = async () => {
  return await handleRequest(Channels.CLOSE_DB);
};

// DELETE
(window as any).loadDb = loadDb;
(window as any).closeDb = closeDb;
(window as any).getPageIndex = getPageIndex;
(window as any).createPage = createPage;
(window as any).updatePage = updatePage;
(window as any).getPage = getPage;
(window as any).getAllPatches = getAllPatches;
