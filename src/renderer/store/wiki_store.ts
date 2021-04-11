import { IWiki } from '@common/config';
import { IWikiNode } from '@common/wiki';
import { loadTree, loadFile } from '../api/wiki_api';
import { refresh } from '../render_state';

type IWikiState = {
  loaded: false;
} | {
  loaded: true;
  wiki: IWiki;
  tree: IWikiNode;
  openPages: string[];
  pageData: Record<string, string>;
};

export const createWikiStore = () => {
  // This structure allows the hooks to reference and update the inner state
  // while using an intersection type to determine existence of loaded values,
  // as the state's values need to be set all at once (instead of serially)
  const wikiState = {
    ref: {
      loaded: false,
    } as IWikiState
  };

  const setCurrentWiki = async (wiki: IWiki) => {
    const result = await loadTree(wiki.folder);
    if (result.success) {
      console.log(`Loaded wiki tree: ${JSON.stringify(result.payload.tree)}`);

      wikiState.ref = {
        loaded: true,
        wiki: wiki,
        tree: result.payload.tree,
        openPages: [],
        pageData: {},
      };
    } else {
      // push error
      console.log(`Failed to load wiki tree from folder '${wiki.folder}':\n${result.error}`);
    }

    refresh();
  };

  const loadPageData = async (filePath: string): Promise<string | undefined> => {
    if (!wikiState.ref.loaded) {
      throw new Error('No wiki is loaded');
    }
    const result = await loadFile(filePath);
    if (result.success) {
      wikiState.ref.openPages?.push(filePath);
      const pageData = result.payload.data;
      wikiState.ref.pageData[filePath] = pageData;
      return pageData;
    } else {
      // push error
      console.log(`Failed to load file '${filePath}:\n${result.error}'`);
    }
  };

  const getCachedPage = (filePath: string): string | undefined => {
    if (!wikiState.ref.loaded) {
      throw new Error('No wiki is loaded');
    }
    const result = wikiState.ref.pageData[filePath];
    if (result) {
      return result;
    }
  };

  const getPage = async (filePath: string): Promise<string> => {
    return getCachedPage(filePath) || (await loadPageData(filePath)) || '';
  };

  const unload = () => {
    wikiState.ref = {
      loaded: false,
    };

    refresh();
  };

  return {
    wikiState,
    wikiHooks: {
      setCurrentWiki,
      getPage,
      unload,
    }
  };
};
