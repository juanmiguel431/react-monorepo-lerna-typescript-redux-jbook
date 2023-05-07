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

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'text'
  }
});

//https://react-redux.js.org/using-react-redux/usage-with-typescript#define-root-state-and-dispatch-types
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
