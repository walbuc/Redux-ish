import R from 'ramda';

export default R.curry((createStore, reducer, initState) => {
  const actionHistory = [];
  const store = createStore((state, action) => {
    switch (action.type) {
      case '@@/TRAVEL':
        return R.reduce((accState, nextAction) => {
          console.log(nextAction.type, nextAction.value);
          return reducer(accState, nextAction);
        }, initState, action.value);

      default:

        return reducer(state, action);
    }
  }, initState);
  // this function is bound to the global obj window.
  // call it with the state that you would want your App
  // time travel to.
  window.changeState = (i) => {
    actionHistory[i] && store.dispatch({ type: '@@/TRAVEL', value: R.slice(0, i, actionHistory) });
  };

  const middleDispatch = (action) => {
    store.dispatch(action);
    actionHistory.push(action);
  };

  return {
    getState: store.getState,

    dispatch: middleDispatch,

    subscribe: store.subscribe,
  };
});
