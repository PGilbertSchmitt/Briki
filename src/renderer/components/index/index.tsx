import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageIndexItem } from '@common/queries';
import { store, pageHooks } from '@renderer/store/root_store';
import { refresh } from '@renderer/render_state';
import { withTopMenu } from '@renderer/components/nav/top_menu';

const IndexItem: FC<{ item: PageIndexItem; }> = ({ item }) => (
  <div>
    <Link to={`/page/${item.slug}`}>{item.title}</Link>
    <p>({item.slug})</p>
  </div>
);

const _PageIndex: FC = () => {
  useEffect(() => {
    pageHooks.loadIndex().then(refresh);
  }, []);

  if (store.pageStore.index.size === 0)  {
    // TODO: Add loading maybe? It's probably too quick to matter, but who knows
    return null;
  }

  return (
    <div>
      {Array.from(store.pageStore.index).map(([ slug, { id, title } ]) => (
        <IndexItem item={{ slug, id, title }} key={id} />
      ))}
    </div>
  );
};

export const PageIndex = withTopMenu(_PageIndex);
