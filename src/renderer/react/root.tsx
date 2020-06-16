import React, { FC } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as rootStore from '@renderer/store/root_store';
import { WikiSelect } from './components/database/wikiSelect';

export const Root: FC = () => {
  /* eslint-disable */
  // DELETE, only for testing
  const { store, ...hooks } = rootStore;
  (window as any).store = store;
  (window as any).hooks = hooks;
  /* eslint-enable */

  return (
    <HashRouter>
      <Switch>
        <Route exact path='/'>
          {console.log('Hold on just a hot second')}
          <Redirect to='/database' />
        </Route>

        <Route path='/database' component={WikiSelect} />
      </Switch>
    </HashRouter>
  );
};
