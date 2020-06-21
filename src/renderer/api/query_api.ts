import { Channels } from '@common/queries';
import { handleRequest } from './request_handler';

export const createPage = async (title: string, content: string) => {
  return await handleRequest(Channels.CREATE_PAGE, { title, content });
};

