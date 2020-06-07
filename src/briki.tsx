import React from 'react';
import ReactDOM from 'react-dom';

import { Root } from './react/root';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Spectrum is GREEN');
  ReactDOM.render(
    <Root />,
    document.getElementById('root'),
  );
});