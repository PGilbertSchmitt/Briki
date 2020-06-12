import React from 'react';
import { render } from 'react-dom';

import { Root } from './react/root';
import { renderState } from './render_state';

const paint = () => {
  if (renderState.dirty) {
    console.log(`Rendering frame: ${renderState.frame}`);
    render(
      <Root />,
      document.getElementById('root')
    );
    renderState.frame++;
    renderState.dirty = false;
  }
};

// Begins the loading process, only rerendering the state if there's a change,
// and only on the next animation frame
const nextScreenTick = () => {
  paint();
  window.requestAnimationFrame(nextScreenTick);
};

window.onload = nextScreenTick;
