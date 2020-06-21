import { isNil } from 'ramda';
import { Tables, PageRecord, PageResult } from '@common/queries';
import Knex from 'knex';

const knexConfig = (filename: string) => ({
  client: 'sqlite3',
  connection: { filename },
  useNullAsDefault: true,
});

export const initializeDbService = () => {
  const dbState = {
    client: null as Knex | null
  };

  const getClient = () => {
    if (isNil(dbState.client)) {
      throw new Error('No sqlite connection established');
    }
    return dbState.client;
  };

  return {
    open: async (filename: string) => {
      dbState.client = Knex(knexConfig(filename));
    },

    close: async () => {
      dbState.client?.destroy();
      dbState.client = null;
    },

    initDb: async () => {
      if (isNil(dbState.client)) {
        throw new Error('No sqlite connection established');
      }

      return await dbState.client?.schema.createTable(Tables.PAGES, table => {
        table.increments();
        table.string('title').unique().notNullable();
        table.text('content').notNullable();
        table.timestamps(false, true);
      });
    },

    /**
     * Creates new page index, returning the ID of the new row
     */
    createPage: async (page: PageRecord) => {
      const ids = (await getClient()(Tables.PAGES).insert(page));
      return ids[0];
    },

    selectPage: async (title: string) => {
      const pages = await getClient()<PageRecord, PageResult[]>(Tables.PAGES)
        .select()
        .where({ title })
        .limit(1);
      return pages[0];
    },
  };
};

export type DbService = ReturnType<typeof initializeDbService>;
