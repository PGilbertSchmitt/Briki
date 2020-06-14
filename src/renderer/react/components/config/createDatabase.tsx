import React, { FC, useState, useEffect, useRef } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

export const CreateDatabase: FC = () => {
  const [ name, setName ] = useState('');
  const [ folder, setFolder ] = useState('');

  // Getting the 'directory' field onto the Input element is bizarrely difficult
  const directoryInputRef = useRef<(HTMLInputElement & {
    directory: string,
    webkitdirectory: string
  })>(null);

  useEffect(() => {
    if (directoryInputRef.current) {
      directoryInputRef.current.directory = 'true';
      directoryInputRef.current.webkitdirectory = 'true';
    }
  }, []);
  
  return (
    <form>
      <Input
        type='text'
        placeholder='Database name'
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <input
        type='file'
        ref={directoryInputRef}
        hidden
        onChange={event => {
          event.target.files && setFolder(event.target.files[0].path);
        }}
      />

      <Button
        onClick={() => {
          directoryInputRef.current?.click();
        }}
      >
        Select to folder...
      </Button>

      <Button onClick={() => console.log(`saving ${name} as ${folder}`)}>Create DB</Button>
    </form>
  );
};
