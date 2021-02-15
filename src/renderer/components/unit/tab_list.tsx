import React, { FC } from 'react';
import styled from 'styled-components';
import { Scrollbar } from 'react-scrollbars-custom';
// import { Menu } from 'semantic-ui-react';

export const TabListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Tab = styled.div`
  max-width: 300px;
  min-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 13px 16px;
  margin: 0;
`;

interface TabProps {
  tabs: string[];
}

export const TabList: FC<TabProps> = ({ tabs }) => (
  <Scrollbar
    style={{ width: '100%', height: 40 }}
    noScrollY={true}
    removeTracksWhenNotUsed={true}
  >
    <TabListContainer>
      {tabs.map((content, key) =>
        <Tab key={key}>{content}</Tab>
      )}
    </TabListContainer>
  </Scrollbar>
);
