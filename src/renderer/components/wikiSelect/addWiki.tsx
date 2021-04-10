import React, { FC, useState, useCallback } from 'react';
import {
  Button,
  Input
} from 'semantic-ui-react';
import styled from 'styled-components';
import { parse } from 'path';

import { chooseDirectory } from '@renderer/api/util_api';
import { configHooks, errorHooks } from '@renderer/store/root_store';
import { refresh } from '@src/renderer/render_state';

const FormWrapper = styled.form``;

export const AddWiki: FC = () => {
  const [ name, setName ] = useState('');

  const folderHandler = useCallback(async () => {
    console.log('called folder finder');
    if (name === '') {
      errorHooks.pushError('Wiki name can\'t be blank');
      // Could also highlight the text input here
      return;
    }
    const result = await chooseDirectory();
    if (result.success && result.payload.dir) {
      await configHooks.registerWiki({
        name: name || parse(result.payload.dir).name,
        folder: result.payload.dir
      });
      setName('');
      refresh();
    }
  }, [ name ]);

  return (
    <FormWrapper
      onSubmit={ev => ev.preventDefault()}
    >
      <Input
        type='text'
        placeholder='Database name'
        value={name}
        onChange={event => setName(event.target.value)}
      />
      
      <Button
        type='button'
        onClick={folderHandler}
      >Add wiki</Button>
    </FormWrapper>
  );
};


