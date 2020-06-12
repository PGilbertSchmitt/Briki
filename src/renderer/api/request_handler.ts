import { ipcRenderer } from 'electron';
import { ErrorPayload } from '@common/error';

export const handleRequest = <T>(channel: string, ...args: unknown[]) => {
  return ipcRenderer.invoke(channel, ...args) as Promise<T | ErrorPayload>;
};
