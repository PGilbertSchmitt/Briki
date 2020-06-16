import React, { FC, useState } from 'react';
import {
  Button,
  Input
} from 'semantic-ui-react';

import { chooseDirectory } from '@renderer/api/util_api';
import { configHooks } from '@renderer/store/root_store';
import { refresh } from '@src/renderer/render_state';

export const CreateDatabase: FC = () => {
  const [ name, setName ] = useState('');
  
  return (
    <form>
      <Input
        type='text'
        placeholder='Database name'
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <Button onClick={async () => {
        const result = await chooseDirectory();
        if (result.success) {
          await configHooks.saveDb({
            name,
            file: `${result.dir}/${name}.sqlite`
          });
          refresh();
        }
      }}>Save to...</Button>
    </form>
  );
};
