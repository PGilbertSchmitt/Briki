export enum Channels {
  SELECT_DIR = 'SELECT_DIR'
}

export interface DirPayload {
  success: true;
  dir: string;
}
