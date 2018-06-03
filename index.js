export default function createStore(reducer) {
  let state = {};
  let listeners = [];

  const getState = () => state;

  const subscribe = (newListener) => {
    listeners.push(newListener);
    return () => {
      listeners = listeners.filter(listener => listener !== newListener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => {
      listener();
    });
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}
