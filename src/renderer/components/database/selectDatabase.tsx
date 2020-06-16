import React, { FC } from 'react';
import { List } from 'semantic-ui-react';

import { IDatabase } from '@src/common/config';

export const SelectDatabase: FC<{dbs: IDatabase[];}> = ({ dbs }) => {
  return (
    <List divided relaxed>
      {dbs.map((db, i) => (
        <List.Item key={`${i}_wiki`} onClick={() => console.log(db.name)}>
          <List.Content>
            <List.Header>{db.name}</List.Header>
            <List.Description>{db.file}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
