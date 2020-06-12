/**
 * SqliteDB controller managed by main
 */

import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { registerHandler } from './response_handler';
import { Channels, DbPayload } from '@common/db';

export type Db = Database<sqlite3.Database, sqlite3.Statement> | null;

export const initializeDbController = () => {
  console.log('Initializing DB...');
  
  const dbState = {
    db: null as Db
  };

  registerHandler<[string]>(Channels.LOAD_DB, async (dbName): Promise<DbPayload> => {
    dbState.db = await open({
      driver: sqlite3.Database,
      filename: dbName
    });
    return { success: true };
  });

  registerHandler(Channels.CLOSE_DB, async (): Promise<DbPayload> => {
    await dbState.db?.close();
    return { success: true };
  });

  console.log('DB initialized.');

  return dbState;
};
 