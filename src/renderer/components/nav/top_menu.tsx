import React, { FC, ComponentType } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { store, dbHooks } from '@renderer/store/root_store';

export const withTopMenu = <P extends Record<string, unknown>>(
  Component: ComponentType<P>
): FC<P> => ({ ...props }) => {
    const history = useHistory();
    return (
      <>
        <Menu>
          <Menu.Item header>{store.dbState.db?.name}</Menu.Item>
          <Menu.Item
            name='pageIndex'
            onClick={() => history.push('/page-index')}
          />
          <Menu.Item
            name='close'
            onClick={async () => {
              await dbHooks.closeDb();
              history.push('/database');
            }}
          />
        </Menu>
        <Component {...props as P} />
      </>
    );
  };
