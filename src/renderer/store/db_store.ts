import * as DbApi from '@renderer/api/db';

export const createDbStore = () => {
  const dbState = {
    loaded: false,
    dbName: null as string | null,
  };

  const loadDb = async () => {
    const result = await DbApi.loadDb('freik.sqlite');
    if (result.success) {
      dbState.loaded = true;
      dbState.dbName = 'freik.sqlite';
    } else {
      dbState.loaded = false;
      console.log(`Error opening freik.sqlite: ${result.error}`);
    }
  };

  return {
    dbState,
    dbHooks: {
      loadDb
    }
  };
};
