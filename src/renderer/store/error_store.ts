import { head, drop } from 'ramda';

export const createErrorStore = () => {
  let errorQueue: string[] = [];

  const pushError = (error: string) => {
    errorQueue.push(error);
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
