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
  PageIndex,
} from '@common/queries';

export const initializeQueryController = (dbService: DbService) => {
  registerHandler<PageIndex[]>(
    Channels.GET_PAGE_INDEX,
    async () => {
      return await dbService.getPageIndex();
    },
  );
  
  registerHandler<PageRecord>(
    Channels.CREATE_PAGE,
    async (page: PageEdit) => {
      return await dbService.createPage(page);
    },
  );

  registerHandler<PageRecord>(
    Channels.SELECT_PAGE,
    async (id: number) => {
      return await dbService.selectPage(id);
    },
  );

  registerHandler<number>(
    Channels.UPDATE_PAGE,
    async (id: number, page: PageEdit) => {
      return await dbService.updatePage(id, page);
    },
  );
};
 