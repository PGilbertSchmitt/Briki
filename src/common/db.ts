export enum Channels {
  LOAD_DB = 'LOAD_DB',
  CLOSE_DB = 'CLOSE_DB',
  EXE_QUERY = 'EXE_QUERY',
}

export type DbPayload = {
  success: true
};