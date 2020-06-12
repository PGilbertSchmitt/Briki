import { createDbStore } from './db_store';
import { createConfigStore } from './config_store';
import { createErrorStore } from './error_store';

const { dbState, dbHooks } = createDbStore();
const { configState, configHooks } = createConfigStore();
const { errorQueue, errorHooks } = createErrorStore();

const store = {
  dbState,
  configState,

  errorQueue,
};

export {
  store,

  dbHooks,
  configHooks,
  errorHooks,
};