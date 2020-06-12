/**
 * SqliteDB service used by main
 */

import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Channels, SuccessPayload as SP } from '@common/db';

export type Db = Database<sqlite3.Database, sqlite3.Statement> | null;

export const initializeDbService = () => {
  const dbState = {
    db: null as Db
  };

  ipcMain.handle(Channels.LOAD_DB, async (_event, dbName): Promise<SP> => {
    try {
      dbState.db = await open({
        driver: sqlite3.Database,
        filename: dbName
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  });

  ipcMain.handle(Channels.CLOSE_DB, async (): Promise<SP> => {
    try {
      await dbState.db?.close();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  });

  return dbState;
};
 