import {
  Channels,
  PageEdit,
  PageIndexItem,
  PageRecord,
  PatchIndex,
} from '@common/queries';
import { handleRequest } from './request_handler';

export const getPageIndex = async () => {
  return await handleRequest<PageIndexItem[]>(Channels.GET_PAGE_INDEX);
};

export const createPage = async (page: PageEdit) => {
  return await handleRequest<PageRecord>(Channels.CREATE_PAGE, page);
};

export const getPage = async (id: number) => {
  return await handleRequest<PageRecord>(Channels.SELECT_PAGE, id);
};

export const updatePage = async (id: number, page: PageEdit) => {
  return await handleRequest<PageEdit>(Channels.UPDATE_PAGE, id, page);
};

export const getAllPatches = async (pageId: number) => {
  return await handleRequest<PatchIndex[]>(Channels.GET_PATCH_INDEX, pageId);
};
