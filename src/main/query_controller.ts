/**
 * SqliteDB controller managed by main
 * 
 * Not meant for executing queries, only for external management of the DB,
 * so loading and closing. In future, backups could potentially occur here.
 */

import { registerHandler } from './response_handler';
import { DbService } from './db_service';
import {
  Channels,
  PageRecord,
  PageResult,
} from '@common/queries';

export const initializeQueryController = (dbService: DbService) => {
  registerHandler<number>(
    Channels.CREATE_PAGE,
    async (page: PageRecord): Promise<number> => {
      return await dbService.createPage(page);
    }
  );

  registerHandler<PageResult>(
    Channels.SELECT_PAGE,
    async (title: string): Promise<PageResult> => {
      return await dbService.selectPage(title);
    }
  );
};
 