import React, { FC, useState } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import { chooseDirectory } from '@renderer/api/util_api';
import { configHooks } from '@renderer/store/root_store';

export const CreateDatabase: FC = () => {
  const [ name, setName ] = useState('');
  const [ folder, setFolder ] = useState('');
  
  return (
    <form>
      <Input
        type='text'
        placeholder='Database name'
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <Button
        onClick={() => {
          chooseDirectory().then(payload => {
            if (payload.success) {
              setFolder(payload.dir);
            }
          });
        }}
      >
        Select to folder...
      </Button>

      <Button onClick={() => (
        configHooks.saveDb({ name, file: `${folder}/${name}.sqlite` })
      )}>Create DB</Button>
    </form>
  );
};
