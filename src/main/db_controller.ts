/**
 * SqliteDB controller managed by main
 */

import { registerHandler } from './response_handler';
import { DbService } from './db_service';
import { SuccessPayload } from '@common/response';
import { Channels } from '@common/db';

export const initializeDbController = (dbService: DbService) => {
  registerHandler<[string]>(Channels.LOAD_DB, async (dbName): Promise<SuccessPayload> => {
    await dbService.open(dbName);
    return { success: true };
  });

  registerHandler(Channels.CLOSE_DB, async (): Promise<SuccessPayload> => {
    await dbService.close();
    return { success: true };
  });
};
 