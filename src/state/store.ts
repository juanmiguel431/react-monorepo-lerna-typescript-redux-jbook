import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from './action-creators';

const composeEnhancers = composeWithDevTools({ actionCreators });

export const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));


store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code'
  }
});

console.log('JMPC', store.getState());

// const state = store.getState();
