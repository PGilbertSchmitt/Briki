import React, { FC } from 'react';
import { IDatabase } from '@common/config';
import { CreateDatabase } from './createDatabse';

export const Config: FC<{databases: IDatabase[]}> = () => {
  return <CreateDatabase />;
};
