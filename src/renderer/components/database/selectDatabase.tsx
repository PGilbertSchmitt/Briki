import React, { FC } from 'react';
import { List, Button } from 'semantic-ui-react';

import { IDatabase } from '@common/config';
import { configHooks } from '@renderer/store/root_store';
import { refresh } from '@renderer/render_state';

export const SelectDatabase: FC<{dbs: IDatabase[];}> = ({ dbs }) => {
  return (
    <List divided relaxed>
      {dbs.map((db, i) => (
        <List.Item key={`${i}_wiki`} onClick={() => console.log(db.name)}>
          <List.Content>
            <List.Header>{db.name}</List.Header>
            <List.Description>{db.file}</List.Description>
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
