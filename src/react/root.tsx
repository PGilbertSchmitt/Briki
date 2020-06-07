import React, { FC } from 'react';
import * as rootStore from '@src/store/root_store';

export const Root: FC = () => {
  /* eslint-disable */
  // DELETE, only for testing
  const { store, ...hooks } = rootStore;
  (window as any).store = store;
  (window as any).hooks = hooks;
  /* eslint-enable */
  
  return (
    <h2>Ey, &apos;ow you doin&apos;</h2>
  );
};
