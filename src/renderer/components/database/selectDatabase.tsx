import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';

import { IDatabase } from '@common/config';
import { store, configHooks, dbHooks } from '@renderer/store/root_store';
import { refresh } from '@renderer/render_state';

export const SelectDatabase: FC<{dbs: IDatabase[];}> = ({ dbs }) => {
  if (store.dbState.db) {
    return <Redirect to='/page-index' />;
  }

  return (
    <List divided relaxed>
      {dbs.map((db, i) => (
        <List.Item key={`${i}_wiki`}>
          <List.Content>
            <div onClick={() => {
              dbHooks.loadDb(db).then(refresh);
            }}>
              <List.Header>{db.name}</List.Header>
              <List.Description>{db.file}</List.Description>
            </div>
            <Button
              type='button'
              onClick={async () => {
                await configHooks.removeDb(db.file);
                refresh();
              }}
            >Delete</Button>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
