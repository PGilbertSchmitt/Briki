/**
 * Config controller managed by main
 */

import Store from 'electron-store';
import { Channels, Config, ConfigPayload, IWiki } from '@common/config';
import { registerHandler } from './response_handler';

export const initializeConfigController = () => {
  console.log('Initializing config...');
  
  const store = new Store<Config>({
    defaults: {
      wikis: [],
      savedTheme: 'hello',
    }
  });

  registerHandler(Channels.GET_CONFIG, async (): Promise<ConfigPayload> => {
    return {
      success: true,
      config: {
        wikis: store.get('wikis'),
        savedTheme: store.get('savedTheme'),
      }
    };
  });

  registerHandler(Channels.REGISTER_WIKI, async (wiki: IWiki): Promise<void> => {
    console.log('Registering wiki...');
    const current = store.get('wikis');
    store.set('wikis', [ ...current, wiki ]);
    console.log('wiki config saved');
  });

  registerHandler(Channels.REMOVE_WIKI, async (folderName: string): Promise<void> => {
    console.log('Removing wiki...');
    const current = store.get('wikis');
    store.set('wikis', current.filter(({ folder }) => folder !== folderName));
    console.log('wiki config removed');
  });

  registerHandler(Channels.RENAME_WIKI, async (wiki: IWiki): Promise<void> => {
    console.log('Renaming wiki...');
    const current = store.get('wikis');
    const others = current.filter(({ folder }) => folder !== wiki.folder);
    store.set('wikis', [ ...others, wiki ]);
    console.log('wiki config renamed');
  });

  registerHandler(Channels.SELECT_THEME, async (theme: string): Promise<void> => {
    console.log('Selecting theme...');
    store.set('savedTheme', theme);
    console.log('Theme selected');
  });

  console.log('Config initialized');

  return store;
};
