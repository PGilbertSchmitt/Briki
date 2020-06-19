export enum Channels {
  SELECT_DIR = 'SELECT_DIR',
  SELECT_FILE = 'SELECT_FILE',
}

export interface DirPayload {
  success: true;
  dir: string;
}

export interface FilePayload {
  success: true;
  file: string;
}
