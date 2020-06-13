import React, { FC, useState, useEffect, useRef } from 'react';

export const CreateDatabase: FC = () => {
  const [ name, setName ] = useState('');
  const [ folder, setFolder ] = useState('');

  // Getting the 'directory' field onto the Input element is bizarrely difficult
  const directoryRef = useRef<(HTMLInputElement & {
    directory: string,
    webkitdirectory: string
  })>(null);

  useEffect(() => {
    if (directoryRef.current) {
      directoryRef.current.directory = 'true';
      directoryRef.current.webkitdirectory = 'true';
    }
  }, []);
  
  return (
    <form>
      <input
        type='text'
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <input
        type='file'
        ref={directoryRef}
        onChange={event => {
          event.target.files && setFolder(event.target.files[0].path);
        }}
      />

      <button onClick={() => console.log(`saving ${name} as ${folder}`)}>Create DB</button>
    </form>
  );
};
