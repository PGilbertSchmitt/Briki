/**
 * Interface for renderer process to communicate with main process's config controller
 */

import { Channels, ConfigPayload, IWiki } from '@common/config';
import { handleRequest } from './request_handler';

export const loadConfig = async () => {
  return await handleRequest<ConfigPayload>(Channels.GET_CONFIG);
};

export const registerWiki = async (wiki: IWiki) => {
  return await handleRequest(Channels.REGISTER_WIKI, wiki);
};

export const removeWiki = async (folder: string) => {
  return await handleRequest(Channels.REMOVE_WIKI, folder);
};

export const renameWiki = async (wiki: IWiki) => {
  return await handleRequest(Channels.RENAME_WIKI, wiki);
};
