import { ipcMain } from 'electron';
import { Response } from '@common/response';

type handlerCallback<T> = (
  ...args: unknown[]
) => Promise<T>;

let messageId = 0;

export const registerHandler = <T = void>(channel: string, cb: handlerCallback<T>) => {
  ipcMain.handle(channel, async (_event, ...args: unknown[]): Promise<Response<T>> => {
    try {
      console.log(
        `[${messageId}] Received call to ${channel} with args: ${JSON.stringify(args)}`
      );
      const result = await cb(...args);
      console.log(`[${messageId}] Replied with ${JSON.stringify(result)}`);
      return {
        success: true,
        payload: result,
      };
    } catch (error) {
      console.error(error.stack);
      return {
        success: false,
        error,
      };
    } finally {
      messageId++;
    }
  });
};
