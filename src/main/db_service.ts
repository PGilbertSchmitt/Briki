import { isNil } from 'ramda';
import Knex from 'knex';
import { Tables, PageRecord, PatchRecord, PageEdit, PatchIndex, PageIndex } from '@common/queries';
import { makePatch } from '@common/dmf';

const knexConfig = (filename: string) => ({
  client: 'sqlite3',
  connection: { filename },
  useNullAsDefault: true,
});

export const initializeDbService = () => {
  const dbState = {
    client: null as Knex | null,
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
      const client = getClient();

      await client.transaction(async trx => {
        await trx.schema.createTable(Tables.PAGES, table => {
          table.increments();

          table.string('title')
               .notNullable();

          table.integer('version')
               .notNullable();
               
          table.string('slug')
               .notNullable()
               .unique();

          table.text('content')
               .notNullable();

          table.timestamps(false, true);
        });
  
        await trx.schema.createTable(Tables.PATCHES, table => {
          table.increments();

          table.string('title')
               .notNullable();

          table.integer('version')
               .notNullable();

          table.integer('page_id')
               .unsigned()
               .notNullable();
          table.foreign('page_id')
               .references('pages.id');

          table.json('patch')
               .notNullable();

          table.timestamp('created_at')
               .defaultTo(client.fn.now());      
        });
      });
    },

    getPageIndex: async (): Promise<PageIndex[]> => {
      return await getClient()<PageRecord>(Tables.PAGES).select('id', 'slug', 'title');
    },

    /**
     * Creates new page index, returning the ID of the new row
     */
    createPage: async (page: PageEdit): Promise<PageRecord> => {
      const client = getClient();

      return await client.transaction(async trx => {
        const [ page_id ] = await trx<PageRecord>(Tables.PAGES).insert<number[]>({
          ...page,
          version: 1,
        });

        await trx<PatchRecord>(Tables.PATCHES).insert({
          title: page.title,
          page_id,
          patch: JSON.stringify(makePatch('', page.content)),
          version: 1,
        });

        const [ pageRecord ] = await trx<PageRecord>(Tables.PAGES)
          .select()
          .where({
            id: page_id
          });
        
        return pageRecord;
      });
    },

    selectPage: async (id: number): Promise<PageRecord> => {
      const pages = await getClient()<PageRecord>(Tables.PAGES)
        .select()
        .where({ id });
      return pages[0];
    },

    updatePage: async (id: number, page: PageEdit): Promise<number> => {
      const client = getClient();

      return await client.transaction(async trx => {
        const [ orig ] = await trx<PageRecord>(Tables.PAGES)
          .select('content', 'version')
          .where({ id });

        const newVersion = orig.version + 1;

        const row_id = await trx<PageRecord>(Tables.PAGES)
          .where({ id })
          .update({
            ...page,
            version: newVersion
          });

        await trx<PatchRecord>(Tables.PATCHES).insert({
          title: page.title,
          page_id: id,
          patch: JSON.stringify(makePatch(orig.content, page.content)),
          version: newVersion
        });

        return row_id;
      });
    },

    getPatchIndex: async (pageId: number): Promise<PatchIndex[]> => {
      const client = getClient();

      return await client<PatchRecord, PatchIndex[]>(Tables.PATCHES)
        .select('id', 'version')
        .where({ page_id: pageId });
    },
  };
};

export type DbService = ReturnType<typeof initializeDbService>;
