/**
 * SqliteDB controller managed by main
 * 
 * Not meant for executing queries, only for external management of the DB,
 * so loading and closing. In future, backups could potentially occur here.
 */

import { registerHandler } from './response_handler';
import { DbService } from './db_service'; 
import { Channels } from '@common/db';

export const initializeDbController = (dbService: DbService) => {
  registerHandler(Channels.LOAD_DB, async (dbName: string): Promise<void> => {
    await dbService.open(dbName);
  });

  registerHandler(Channels.CLOSE_DB, async (): Promise<void> => {
    await dbService.close();
  });
};
 