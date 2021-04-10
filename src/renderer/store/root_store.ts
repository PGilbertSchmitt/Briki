import { createConfigStore } from './config_store';
import { createErrorStore } from './error_store';
import { createWikiStore } from './wiki_store';

const { configState, configHooks } = createConfigStore();
const { errorQueue, errorHooks } = createErrorStore();
const { wikiState, wikiHooks } = createWikiStore();

const store = {
  configState,

  wikiState,

  errorQueue,
};

export {
  store,

  configHooks,
  errorHooks,
  wikiHooks,
};