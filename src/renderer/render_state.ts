// This global object is only used in the index file, but can (RE: should only) be modified
// by the invalidate hook, which allows any component to cause the react dom to rerender.
// Thanks to StoneCypher for showing me this pattern!

export const renderState = {
  frame: 0,
  dirty: true,
};

export const refresh = () => renderState.dirty = true;

// DELETE
(window as any).tick = refresh; // eslint-disable-line
