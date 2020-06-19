import React, { FC, useEffect } from 'react';
import { store, configHooks } from '@renderer/store/root_store';
import { refresh } from '@renderer/render_state';
import {
  Container,
  Divider,
} from 'semantic-ui-react';
import styled from 'styled-components';

import { CreateDatabase } from './createDatabase';
import { SelectDatabase } from './selectDatabase';

const SelectWrapper = styled.div`
  width: 400px;
  border: 1px solid red;
`;

export const WikiSelect: FC = () => {
  useEffect(() => {
    configHooks.loadConfig().then(refresh);
  }, []);

  if (store.configState.config === null) {
    return null;
  }

  const { databases } = store.configState.config;

  return (
    <SelectWrapper>
      {databases.length > 0 && (
        <Container>
          <h2>Wikis</h2>
          <SelectDatabase dbs={store.configState.config.databases} />
        </Container>
      )}
      <Divider />
      <CreateDatabase />
    </SelectWrapper>
  );
};
