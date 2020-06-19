export enum Channels {
  GET_CONFIG = 'GET_CONFIG',
  SAVE_DB = 'SAVE_DB',
  REGISTER_DB = 'REGISTER_DB',
  REMOVE_DB = 'REMOVE_DB',
}

export interface IDatabase {
  name: string;
  file: string;
}

export type Config = {
  databases: IDatabase[];
};

export type ConfigPayload = {
  success: true;
  config: Config;
};