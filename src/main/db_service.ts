import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export type Db = Database<sqlite3.Database, sqlite3.Statement> | null;

export const initializeDbService = () => {
  const dbState = {
    db: null as Db
  };

  return {
    open: async (filename: string) => {
      dbState.db = await open({
        driver: sqlite3.Database,
        filename,
      });
    },

    close: async () => {
      await dbState.db?.close();
      dbState.db = null;
    },

    init: async (filename: string) => {
      console.log(`Initializing database '${filename}'`);
      const newDb = await open({
        driver: sqlite3.Database,
        filename,
      });

      // Create schemas here

      await newDb.close();
    },
  };
};

export type DbService = ReturnType<typeof initializeDbService>;
