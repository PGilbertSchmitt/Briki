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

  const loadIndex = async () => {
    const response = await QueryApi.getPageIndex();
    if (response.success) {
      pageStore.index = new Map();
      response.payload.forEach(({ id, slug, title }) => {
        pageStore.index.set(slug, { id, title });
      });
    } else {
      // Load error
      console.log('');
    }
  };

  const getIndex = async (refresh = false) => {
    if (refresh) {
      await loadIndex();
    }
    return pageStore.index;
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
      return record;
    } else {
      // Load error
      console.log(`Error fetching page: ${response.error}`);
    }
  };

  const getPageBySlug = async (slug: string) => {
    // Only reload index if the index is empty (unloaded)
    const indexItem = (await getIndex(pageStore.index.size === 0)).get(slug);
    if (indexItem) {
      return await getPage(indexItem.id);
    } else {
      // Load error
      console.log(`No page found for slug ${slug}`);
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
      // Load error
      console.log(`Error creating page: ${response.error}`);
    }
  };

  const removePage = (id: number) => {
    pageStore.pages.delete(id);
  };

  return {
    pageStore,
    pageHooks: {
      loadIndex,
      getIndex,
      getPage,
      getPageBySlug,
      createNewPage,
      removePage,
    },
  };
};
