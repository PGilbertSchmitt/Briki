/**
 * Wiki Controller managed by main
 */

import { Channels, IWikiNode, ITreePayload, IFilePayload } from '@common/wiki';
import { registerHandler } from './response_handler';
import { promises } from 'fs';

const { readdir, lstat, readFile } = promises;

const loadTree = async (folder: string) => {
  const node: IWikiNode = {
    files: [],
    dirs: [],
  };

  const entries = await readdir(folder);
  for (const entry of entries) {
    const entryPath = `${folder}/${entry}`;
    const stats = await lstat(entryPath);
    if (stats.isFile()) {
      node.files.push(entryPath);
    }
    if (stats.isDirectory()) {
      const subNode = await loadTree(entryPath);
      node.dirs.push({
        path: entryPath,
        node: subNode
      });
    }
  }
  return node;
};

export const initializeWikiController = async () => {
  console.log('Initializing wiki loader...');

  registerHandler(Channels.LOAD_TREE, async (folder: string): Promise<ITreePayload> => {
    console.log('Loading wiki tree...');
    const tree = await loadTree(folder);
    console.log('Loaded wiki tree');

    return {
      success: true,
      tree,
    };
  });

  registerHandler(Channels.LOAD_FILE, async (filePath: string): Promise<IFilePayload> => {
    console.log('Loading file data...');
    const data = await readFile(filePath);
    console.log('Loaded file data');

    return {
      success: true,
      data,
    };
  });
};
