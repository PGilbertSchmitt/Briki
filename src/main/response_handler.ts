import { ipcMain } from 'electron';
import { ErrorPayload } from '@common/error';

type handlerCallback<T extends unknown[]> = (
  ...args: T
) => Promise<unknown>;

let messageId = 0;

export const registerHandler = <T extends unknown[]>(channel: string, cb: handlerCallback<T>) => {
  ipcMain.handle(channel, async (_event, ...args: T): Promise<unknown | ErrorPayload> => {
    try {
      console.log(
        `[${messageId}] Received call to ${channel} with args: ${JSON.stringify(args)}`
      );
      const result = await cb(...args);
      console.log(`[${messageId}] Replied with ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      return {
        success: false,
        error,
      };
    } finally {
      messageId++;
    }
  });
};