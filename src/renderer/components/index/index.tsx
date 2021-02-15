import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageIndexItem } from '@common/queries';
import { store, pageHooks } from '@renderer/store/root_store';
import { withTopMenu } from '@renderer/components/nav/top_menu';

const IndexItem: FC<{ item: PageIndexItem; }> = ({ item }) => (
  <div>
    <Link to={`/page/${item.slug}`}>{item.title}</Link>
    <p>({item.slug})</p>
  </div>
);

const _PageIndex: FC = () => {
  const [ dirty, setDirty ] = useState(true);
  const [ index, setIndex ] = useState<PageIndexItem[]>([]);
  
  useEffect(() => {
    dirty && pageHooks.getIndex(dirty).then(indexMap => {
      indexMap && setIndex(Array.from(indexMap).map(([ slug, { id, title } ]) => ({
        id, title, slug
      })));
    });
    dirty && setDirty(false);
  }, [ dirty ]);

  if (index.length === 0)  {
    // TODO: Add loading maybe? It's probably too quick to matter, but who knows
    return null;
  }

  return (
    <div>
      {index.map(item => (
        <IndexItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export const PageIndex = withTopMenu(_PageIndex);
