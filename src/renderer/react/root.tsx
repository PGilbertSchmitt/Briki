import React, { FC, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import * as rootStore from '@renderer/store/root_store';
import { refresh } from '@renderer/render_state';
import { Config } from './components/config/config';
import { darkTheme } from '@common/muiTheme';

export const Root: FC = () => {
  /* eslint-disable */
  // DELETE, only for testing
  const { store, ...hooks } = rootStore;
  (window as any).store = store;
  (window as any).hooks = hooks;
  /* eslint-enable */

  const { configState } = store;

  useEffect(() => {
    hooks.configHooks.loadConfig().then(refresh);
  }, []);
  
  if (configState.loaded && configState.config?.databases ) {
    console.log('b');
    return (
      <ThemeProvider theme={darkTheme}>
        <Config databases={configState.config.databases}>
          Hello
        </Config>
      </ThemeProvider>
    );
  } else {
    return null;
  }
};
