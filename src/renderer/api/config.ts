/**
 * Interface for renderer process to communicate with main process's config controller
 */

import { Channels, ConfigPayload } from '@common/config';
import { handleRequest } from './request_handler';

export const loadConfig = async () => {
  return await handleRequest<ConfigPayload>(Channels.GET_CONFIG);
};
