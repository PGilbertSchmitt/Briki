import * as DbApi from '@renderer/api/db_api';
import { IDatabase } from '@common/config';

export const createDbStore = () => {
  const dbState = {
    db: null as IDatabase | null,
  };

  const loadDb = async (db: IDatabase) => {
    const result = await DbApi.loadDb(db.file);
    if (result.success) {
      dbState.db = db;
    } else {
      console.log(`Error opening ${db.file}: ${result.error}`);
    }
  };

  const closeDb = async () => {
    const result = await DbApi.closeDb();
    if (result.success) {
      dbState.db = null;
    } else {
      console.log(`Error closing db connection: ${result.error}`);
    }
  };

  return {
    dbState,
    dbHooks: {
      loadDb,
      closeDb,
    }
  };
};
