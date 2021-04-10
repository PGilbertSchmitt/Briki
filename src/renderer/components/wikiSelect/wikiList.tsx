import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';

import { IWiki } from '@common/config';
import { store, configHooks, wikiHooks } from '@renderer/store/root_store';

export const WikiList: FC<{wikis: IWiki[];}> = ({ wikis }) => {
  if (store.wikiState.loaded) {
    return <Redirect to='/page-index' />;
  }

  return (
    <List divided relaxed>
      {wikis.map((wiki, i) => (
        <List.Item key={`${i}_wiki`}>
          <List.Content>
            <div onClick={() => {
              wikiHooks.setCurrentWiki(wiki);
            }}>
              <List.Header>{wiki.name}</List.Header>
              <List.Description>{wiki.folder}</List.Description>
            </div>
            <Button
              type='button'
              onClick={async () => {
                await configHooks.removeWiki(wiki.folder);
              }}
            >Delete</Button>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
