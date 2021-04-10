import { IWiki } from '@common/config';
import { IWikiNode } from '@common/wiki';
import { loadTree } from '../api/wiki_api';
import { refresh } from '../render_state';

export const createWikiStore = () => {
  const wikiState = {
    loaded: false,
    wiki: null as IWiki | null,
    tree: null as IWikiNode | null,
  };

  const setCurrentWiki = async (wiki: IWiki) => {
    const result = await loadTree(wiki.folder);
    if (result.success) {
      console.log(`Loaded wiki tree: ${JSON.stringify(result.payload.tree)}`);

      wikiState.loaded = true;
      wikiState.wiki = wiki;
      wikiState.tree = result.payload.tree;
    } else {
      // push error
      console.log(`Failed to load wiki tree from folder '${wiki.folder}':\n${result.error}`);
    }

    refresh();
  };

  const unload = () => {
    wikiState.loaded = false;
    wikiState.wiki = null;
    wikiState.tree = null;

    refresh();
  };

  return {
    wikiState,
    wikiHooks: {
      setCurrentWiki,
      unload,
    }
  };
};
