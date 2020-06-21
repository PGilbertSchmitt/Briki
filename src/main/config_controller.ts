/**
 * Config controller managed by main
 */

import Store from 'electron-store';
import { Channels, Config, ConfigPayload, IDatabase } from '@common/config';
import { registerHandler } from './response_handler';
import { DbService } from './db_service';

export const initializeConfigController = (dbService: DbService) => {
  console.log('Initializing config...');
  
  const store = new Store<Config>({
    defaults: {
      databases: []
    }
  });

  registerHandler(Channels.GET_CONFIG, async (): Promise<ConfigPayload> => {
    return {
      success: true,
      config: {
        databases: store.get('databases')
      }
    };
  });

  registerHandler(Channels.SAVE_DB, async (db: IDatabase): Promise<void> => {
    console.log('Creating new DB...');
    await dbService.open(db.file);
    await dbService.initDb();
    await dbService.close();

    console.log('DB file created, saving to config...');
    const current = store.get('databases');
    store.set('databases', [ ...current, db ]);
    console.log('db config saved');
  });

  registerHandler(Channels.REGISTER_DB, async (db: IDatabase): Promise<void> => {
    console.log('Registering db...');
    const current = store.get('databases');
    store.set('databases', [ ...current, db ]);
    console.log('db config saved');
  });

  registerHandler(Channels.REMOVE_DB, async (filename: string): Promise<void> => {
    console.log('Removing db...');
    const current = store.get('databases');
    store.set('databases', current.filter(({ file }) => file !== filename));
    console.log('db config removed');
  });

  console.log('Config initialized');

  return store;
};
