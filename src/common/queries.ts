export enum Channels {
  CREATE_PAGE = 'CREATE_PAGE',
  UPDATE_PAGE = 'UPDATE_PAGE',
  SELECT_PAGE = 'SELECT_PAGE',
}

export enum Tables {
  PAGES = 'pages'
}

export interface PageRecord {
  title: string;
  content: string;
}

export interface PageResult extends PageRecord {
  id: number;
  created_at: string;
  updated_at: string;
}
