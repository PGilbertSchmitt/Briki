/**
 * Config service managed by main
 */

import Store from 'electron-store';
import { Channels, Config, ConfigPayload } from '@common/config';
import { registerHandler } from './response_handler';

export const initializeConfigService = () => {
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

  console.log('Config initialized');

  return store;
};
