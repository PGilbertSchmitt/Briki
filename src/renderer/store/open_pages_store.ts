import { PageRecord } from '@common/queries';

type PaneStore = {
  pages: Record<number, PageRecord>;
  currentPane: number;
};

export const createPaneStore = () => {
  const paneStore: PaneStore = {
    pages: {},
    currentPane: -1,
  };

  const setCurrentPane = (id: number) => {

  };

  return paneStore;
};
