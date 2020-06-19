/**
 * Config controller managed by main
 */

import Store from 'electron-store';
import { Channels, Config, ConfigPayload, IDatabase } from '@common/config';
import { SuccessPayload } from '@common/response';
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

  registerHandler<[IDatabase]>(Channels.SAVE_DB, async (db): Promise<SuccessPayload> => {
    console.log('Creating new DB...');
    await dbService.init(db.file);

    console.log('DB file created, saving to config...');
    const current = store.get('databases');
    store.set('databases', [ ...current, db ]);
    console.log('db config saved');
    return { success: true };
  });

  registerHandler<[IDatabase]>(Channels.REGISTER_DB, async (db): Promise<SuccessPayload> => {
    console.log('Registering db...');
    const current = store.get('databases');
    store.set('databases', [ ...current, db ]);
    console.log('db config saved');
    return { success: true };
  });

  registerHandler(Channels.REMOVE_DB, async (filename: string): Promise<SuccessPayload> => {
    console.log('Removing db...');
    const current = store.get('databases');
    store.set('databases', current.filter(({ file }) => file !== filename));
    console.log('db config removed');
    return { success: true };
  });

  console.log('Config initialized');

  return store;
};
