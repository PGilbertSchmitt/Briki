import React, { FC, useEffect } from 'react';
import { store, configHooks } from '@renderer/store/root_store';
import {
  Container,
  Divider,
} from 'semantic-ui-react';
import styled from 'styled-components';

import { AddWiki } from './addWiki';
import { WikiList } from './wikiList';

const SelectWrapper = styled.div`
  width: 400px;
  border: 1px solid red;
`;

export const WikiSelect: FC = () => {
  useEffect(() => {
    configHooks.loadConfig();
  }, []);

  if (store.configState.config === null) {
    return null;
  }

  const { wikis } = store.configState.config;

  return (
    <SelectWrapper>
      {wikis.length > 0 && (
        <Container>
          <h2>Wikis</h2>
          <WikiList wikis={wikis} />
        </Container>
      )}
      <Divider />
      <AddWiki />
    </SelectWrapper>
  );
};
