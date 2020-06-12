import { ipcMain } from 'electron';
import { ErrorPayload } from '@common/error';

type handlerCallback<T extends unknown[]> = (
  ...args: T
) => Promise<unknown>;

export const registerHandler = <T extends unknown[]>(channel: string, cb: handlerCallback<T>) => {
  ipcMain.handle(channel, async (_event, ...args: T): Promise<unknown | ErrorPayload> => {
    try {
      return cb(...args);
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  });
};