import { ipcRenderer } from 'electron';
import { Response } from '@common/response';

export const handleRequest = <T = void>(channel: string, ...args: unknown[]) => {
  return ipcRenderer.invoke(channel, ...args) as Promise<Response<T>>;
};
