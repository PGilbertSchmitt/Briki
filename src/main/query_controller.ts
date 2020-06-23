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
  PageEdit,
} from '@common/queries';

export const initializeQueryController = (dbService: DbService) => {
  registerHandler<number>(
    Channels.CREATE_PAGE,
    async (page: PageRecord): Promise<number> => {
      return await dbService.createPage(page);
    }
  );

  registerHandler<PageRecord>(
    Channels.SELECT_PAGE,
    async (slug: string): Promise<PageRecord> => {
      return await dbService.selectPage(slug);
    }
  );

  registerHandler<number>(
    Channels.UPDATE_PAGE,
    async (id: number, page: PageEdit) => {
      return await dbService.updatePage(id, page);
    }
  );
};
 