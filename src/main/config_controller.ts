/**
 * Config controller managed by main
 */

import Store from 'electron-store';
import { Channels, Config, ConfigPayload, IDatabase } from '@common/config';
import { SuccessPayload } from '@common/response';
import { registerHandler } from './response_handler';

export const initializeConfigController = () => {
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
    const current = store.get('databases');
    store.set('databases', [ ...current, db ]);
    return { success: true };
  });

  console.log('Config initialized');

  return store;
};
