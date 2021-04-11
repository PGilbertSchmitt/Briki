export enum Channels {
  LOAD_TREE = 'LOAD_TREE',
  LOAD_FILE = 'LOAD_FILE',
}

export type IDir = {
  path: string;
  node: IWikiNode;
}

// The tree structure of the Wiki folder
export type IWikiNode = {
  dirs: IDir[];
  files: string[];
}

export interface ITreePayload {
  success: true;
  tree: IWikiNode;
}

export interface IFilePayload {
  success: true;
  data: string;
}
