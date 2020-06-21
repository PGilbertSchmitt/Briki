import { Config, IDatabase } from '@common/config';
import * as ConfigApi from '@renderer/api/config_api';
import { Response } from '@src/common/response';

export const createConfigStore = () => {
  const configState = {
    loaded: false,
    config: null as Config | null,
  };

  const loadConfig = async () => {
    const result = await ConfigApi.loadConfig();
    if (result.success) {
      console.log(`Loaded config: ${JSON.stringify(result.payload.config)}`);
      configState.loaded = true;
      configState.config = result.payload.config;
    } else {
      configState.loaded = false;
      console.error(`Error getting config: ${result.error}`);
    }
  };

  const handleSuccessResult = async (result: Response, action: string) => {
    if (result.success) {
      await loadConfig();
    } else {
      // Push error notification here
      console.log(`Error during db config action [${action}]: ${result.error}`);
    }
  };

  const saveDb = async (db: IDatabase) => {
    console.log(`Saving a new database to ${db.file}`);
    const result = await ConfigApi.saveNewDB(db);
    await handleSuccessResult(result, 'save');
  };

  const registerDb = async (db: IDatabase) => {
    console.log(`Registering database ${db.file}`);
    const result = await ConfigApi.registerDb(db);
    await handleSuccessResult(result, 'register');
  };

  const removeDb = async (file: string) => {
    console.log(`Removing ${file} from config`);
    const result = await ConfigApi.removeDb(file);
    await handleSuccessResult(result, 'remove');
  };

  return {
    configState,
    configHooks: {
      loadConfig,
      saveDb,
      registerDb,
      removeDb,
    }
  };
};
