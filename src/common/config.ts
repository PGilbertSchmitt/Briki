export enum Channels {
  GET_CONFIG = 'GET_CONFIG',
  REGISTER_WIKI = 'REGISTER_WIKI',
  REMOVE_WIKI = 'REMOVE_WIKI',
  RENAME_WIKI = 'RENAME_WIKI',
  SELECT_THEME = 'SELECT_THEME',
}

export interface IWiki {
  name: string;
  folder: string;
}

export type Config = {
  wikis: IWiki[];
  savedTheme: string;
};

export type ConfigPayload = {
  success: true;
  config: Config;
};