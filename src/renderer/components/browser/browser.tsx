import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { IDir } from '@common/wiki';
import { store } from '@renderer/store/root_store';

// Takes a directory string and splits each subdirectory
const pathToTitle = (filePath: string): string => {
  return filePath.replace(/^(\/)+/, '').split('/').join(' > ');
};

const Browser: FC = () => {
  const wikiState = store.wikiState.ref;
  if (!wikiState.loaded) {
    return <Redirect to='/wiki-select' />;
  }

  const [ dir, setDir ] = useState<IDir>({
    path: wikiState.wiki.folder,
    node: wikiState.tree
  });

  const { path, node } = dir;
  const { dirs, files } = node; 

  return (
    <div>
      <h3>{pathToTitle(path)}</h3>
      <p>Folders</p>
      <ul>
        {dirs.map((dir, i) => <li key={i} onClick={() => setDir(dir)}>{dir.path}</li>)}
      </ul>
      <p>Files</p>
      <ul>
        {files.map((file, i) => <li key={i} onClick={() => console.log(`view ${file}`)}>{file}</li>)}
      </ul>
    </div>
  );
};

export default Browser;
