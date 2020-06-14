import { Config, IDatabase } from '@common/config';
import * as ConfigApi from '@renderer/api/config_api';

export const createConfigStore = () => {
  const configState = {
    loaded: false,
    config: null as Config | null,
  };

  const loadConfig = async () => {
    const result = await ConfigApi.loadConfig();
    if (result.success) {
      configState.loaded = true;
      configState.config = result.config;
    } else {
      configState.loaded = false;
      console.error(`Error getting config: ${result.error}`);
    }
  };

  const saveDb = async (db: IDatabase) => {
    console.log(`Saving a new database to ${db.file}`);
    const result = await ConfigApi.saveNewDB(db);
    if (result.success) {
      // Reload the config
      loadConfig();
    } else {
      console.log(`Error saving new DB config: ${result.error}`);
    }
  };

  return {
    configState,
    configHooks: {
      loadConfig,
      saveDb,
    }
  };
};
