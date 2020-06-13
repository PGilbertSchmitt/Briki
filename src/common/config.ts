export enum Channels {
  GET_CONFIG = 'GET_CONFIG'
}

export interface IDatabase {
  name: string,
  file: string,
}

export type Config = {
  databases: IDatabase[]
};

export type ConfigPayload = {
  success: true
  config: Config
};