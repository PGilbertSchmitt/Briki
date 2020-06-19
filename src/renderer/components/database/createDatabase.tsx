import React, { FC, useState, useCallback } from 'react';
import {
  Button,
  Input
} from 'semantic-ui-react';
import styled from 'styled-components';
import { parse } from 'path';

import { chooseDirectory, chooseFile } from '@renderer/api/util_api';
import { configHooks } from '@renderer/store/root_store';
import { refresh } from '@src/renderer/render_state';

const FormWrapper = styled.form``;

export const CreateDatabase: FC = () => {
  const [ name, setName ] = useState('');
  
  const saveHandler = useCallback(async () => {
    console.log('called db creator');
    const result = await chooseDirectory();
    if (result.success && result.dir) {
      await configHooks.saveDb({
        name,
        file: `${result.dir}/${name}.sqlite`
      });
      setName('');
      refresh();
    }
  }, [ name ]);

  const findHandler = useCallback(async () => {
    console.log('called file finder');
    const result = await chooseFile();
    if (result.success && result.file) {
      await configHooks.registerDb({
        name: name || parse(result.file).name,
        file: result.file
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
        onClick={saveHandler}
      >Create new wiki</Button>
      
      <Button
        type='button'
        onClick={findHandler}
      >Add existing wiki</Button>
    </FormWrapper>
  );
};


