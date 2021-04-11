import { parse } from 'path';
import { capitalCase } from 'change-case';

export const pageName = (filePath: string): string => {
  // TODO: Allow user to change a file's "name", which saves the file's preferred name in
  // the config. Then, check the config's name-cache first and use this method if there
  // isn't one saved. Can even be saved for the file path or any file with that base name.
  return capitalCase(parse(filePath).name);
};