import { Config } from '@common/config';
import * as ConfigApi from '@renderer/api/config';

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

  return {
    configState,
    configHooks: {
      loadConfig
    }
  };
};
