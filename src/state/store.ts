import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from './action-creators';
import { persistMiddleware } from './middlewares/persist-middleware';

const composeEnhancers = composeWithDevTools({ actionCreators });

export const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk, persistMiddleware))
);

//https://react-redux.js.org/using-react-redux/usage-with-typescript#define-root-state-and-dispatch-types
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState> //This can cause a circular dependency when using persistMiddleware
export type RootState = ReturnType<typeof reducers>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
