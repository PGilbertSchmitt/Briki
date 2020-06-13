import React, { FC } from 'react';
import { IDatabase } from '@common/config';
import { CreateDatabase } from './createDatabse';

export const Config: FC<{databases: IDatabase[]}> = ({ databases, children }) => {
  if (databases.length > 0) {
    console.log(databases);
    return <>{children}</>;
  }

  return <CreateDatabase />;
};
