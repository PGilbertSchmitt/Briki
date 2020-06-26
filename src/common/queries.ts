export enum Channels {
  GET_PAGE_INDEX = 'GET_PAGE_INDEX',
  CREATE_PAGE = 'CREATE_PAGE',
  UPDATE_PAGE = 'UPDATE_PAGE',
  SELECT_PAGE = 'SELECT_PAGE',
  GET_PATCH_INDEX = 'GET_PATCH_INDEX',
}

export enum Tables {
  PAGES = 'pages',
  PATCHES = 'patches',
}

export interface PageRecord {
  // Row ID
  id: number;
  // Page title
  title: string;
  // Iteration of file, increments on edit
  version: number;
  // Used to link to from other pages (not currently editable)
  slug: string;
  // The text content of the page
  content: string;
  // Timestamps
  created_at: string;
  updated_at: string;
}

export type PageIndex = Pick<PageRecord, 'id' | 'slug' | 'title'>;
export type PageEdit = Pick<PageRecord, 'title' | 'slug' | 'content'>;

export interface PatchRecord {
  // Row ID
  id: number;
  // Title of page after edit
  title: string;
  // Iteration of file that this edit corresponds to (records order of edits)
  version: number;
  // Foriegn key to PageRecord Row ID
  page_id: number;
  // The diff-match-patch Patch list representing a single edit
  patch: string;
  // Timestamp
  created_at: string;
}

export type PatchIndex = Pick<PatchRecord, 'id' | 'version'>;

// Potentially useful
type UnSaved<T extends { id: number; }> = Partial<Pick<T, 'id'>> & Omit<T, 'id'>;
