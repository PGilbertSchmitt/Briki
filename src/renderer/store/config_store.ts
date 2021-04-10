import { Config, IWiki } from '@common/config';
import * as ConfigApi from '@renderer/api/config_api';
import { Response } from '@src/common/response';
import { refresh } from '@renderer/render_state';

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
    refresh();
  };

  const handleSuccessResult = async (result: Response, action: string) => {
    if (result.success) {
      await loadConfig();
    } else {
      // Push error notification here
      console.log(`Error during wiki config action [${action}]: ${result.error}`);
    }
  };

  const registerWiki = async (wiki: IWiki) => {
    console.log(`Registering database ${wiki.folder}`);
    const result = await ConfigApi.registerWiki(wiki);
    await handleSuccessResult(result, 'register');
  };

  const removeWiki = async (folder: string) => {
    console.log(`Removing ${folder} from config`);
    const result = await ConfigApi.removeWiki(folder);
    await handleSuccessResult(result, 'remove');
  };

  const renameWiki = async (wiki: IWiki) => {
    console.log(`Renaming wiki to ${wiki.folder}`);
    const result = await ConfigApi.renameWiki(wiki);
    await handleSuccessResult(result, 'rename');
  };

  return {
    configState,
    configHooks: {
      loadConfig,
      registerWiki,
      removeWiki,
      renameWiki,
    }
  };
};
