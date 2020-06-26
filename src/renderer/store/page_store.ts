import * as QueryApi from '@renderer/api/query_api';
import { PageEdit, PageRecord } from '@common/queries';

type PageStore = {
  // Links a page slug to a tuple containing page id and page title
  index: Map<string, { id: number; title: string; }>;
  // Links a page id to a loaded page object
  pages: Map<number, PageRecord>;
}

export const createPageStore = () => {
  const pageStore: PageStore = {
    index: new Map(),
    pages: new Map(),
  };

  const getIndex = async () => {
    const response = await QueryApi.getPageIndex();
    if (response.success) {
      pageStore.index = new Map();
      response.payload.forEach(({ id, slug, title }) => {
        pageStore.index.set(slug, { id, title });
      });
    } else {
      console.log('');
    }
  };

  const getPage = async (id: number) => {
    const page = pageStore.pages.get(id);
    if (page) {
      return page;
    }

    const response = await QueryApi.getPage(id);
    if (response.success) {
      const record = response.payload;
      pageStore.pages.set(record.id, record);
    } else {
      console.log(`Error fetching page: ${response.error}`);
    }
  };

  const createNewPage = async (page: PageEdit) => {
    const response = await QueryApi.createPage(page);
    if (response.success) {
      const record = response.payload;
      const { id, slug, title } = record;
      pageStore.pages.set(id, record);
      pageStore.index.set(slug, { id, title });
    } else {
      console.log(`Error creating page: ${response.error}`);
    }
  };

  return {
    pageStore,
    pageHooks: {
      getIndex,
      getPage,
      createNewPage,
    },
  };
};
