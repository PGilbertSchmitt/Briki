import { head, drop } from 'ramda';
import { IError } from '@src/interfaces/error';

export const createErrorStore = () => {
  let errorQueue: IError[] = [];

  const pushError = (error: string) => {
    errorQueue.push({ message: error });
  };

  const nextError = () => {
    const error = head(errorQueue);
    errorQueue = drop(1, errorQueue);
    return error;
  };
  
  return {
    errorQueue,
    errorHooks: {
      pushError,
      nextError,
    }
  };
};
