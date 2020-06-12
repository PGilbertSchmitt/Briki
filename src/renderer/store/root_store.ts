import { createDbStore } from './db_store';
import { createErrorStore } from './error_store';

const { dbState, dbHooks } = createDbStore();
const { errorQueue, errorHooks } = createErrorStore();

const store = {
  dbState,

  errorQueue,
};

export {
  store,

  dbHooks,
  errorHooks,
};