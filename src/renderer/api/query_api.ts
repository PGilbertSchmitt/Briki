import { Channels, PageEdit, PatchIndex } from '@common/queries';
import { handleRequest } from './request_handler';

export const createPage = async (page: PageEdit) => {
  return await handleRequest<number>(Channels.CREATE_PAGE, page);
};

export const getPage = async (slug: string) => {
  return await handleRequest(Channels.SELECT_PAGE, slug);
};

export const updatePage = async (id: number, page: PageEdit) => {
  return await handleRequest<PageEdit>(Channels.UPDATE_PAGE, id, page);
};

export const getAllPatches = async (pageId: number) => {
  return await handleRequest<PatchIndex[]>(Channels.GET_PATCH_INDEX, pageId);
};
