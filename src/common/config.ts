export enum Channels {
  GET_CONFIG = 'GET_CONFIG'
}

export type Config = {
  databases: Array<{
    name: string,
    file: string,
  }>
};

export type ConfigPayload = {
  success: true
  config: Config
};