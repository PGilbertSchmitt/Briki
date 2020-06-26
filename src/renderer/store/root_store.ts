import { createDbStore } from './db_store';
import { createConfigStore } from './config_store';
import { createErrorStore } from './error_store';
import { createPageStore } from './page_store';

const { dbState, dbHooks } = createDbStore();
const { configState, configHooks } = createConfigStore();
const { errorQueue, errorHooks } = createErrorStore();
const { pageStore, pageHooks } = createPageStore();

const store = {
  dbState,
  configState,

  pageStore,

  errorQueue,
};

export {
  store,

  dbHooks,
  configHooks,
  errorHooks,
  pageHooks,
};