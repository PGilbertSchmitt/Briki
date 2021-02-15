import React, { FC, ComponentType } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
import { store, dbHooks } from '@renderer/store/root_store';
import { TabList } from '@renderer/components/unit/tab_list';

export const withTopMenu = <P extends Record<string, unknown>>(
  Component: ComponentType<P>
): FC<P> => ({ ...props }) => {
    const history = useHistory();
    // const panes = Array.from(store.pageStore.pages.entries()).map(([ id, page ], key) => (
    //   <Tab key={key} onClick={() => console.log(`Clicked tab for ${id}:${page.title}`)}>{page.title}</Tab>
    // ));
    const panes = Array.from(store.pageStore.pages.entries()).map(([ _id, page ]) => page.title);

    return (
      <>
        <Menu>
          <Dropdown item text={store.dbState.db?.name}>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => history.push('/page-index')}
              >Page Index</Dropdown.Item>

              <Dropdown.Item
                onClick={async () => {
                  await dbHooks.closeDb();
                  // Also need to cleanup the panes []
                  history.push('/database');
                }}
              >
                Close
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <TabList tabs={panes} />
        </Menu>

        <Component {...props as P} />
      </>
    );
  };
