export const createDbStore = () => {
  const dbState = {
    loaded: false
  };

  const loadDb = async (_dbName: string) => {
    // Send message to open DB
  };

  const closeDb = async () => {
    // Send message to close DB
  };

  return {
    dbState,
    dbHooks: {
      loadDb,
      closeDb,
    }
  };
};
