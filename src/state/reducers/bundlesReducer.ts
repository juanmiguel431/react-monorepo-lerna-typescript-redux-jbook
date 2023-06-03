import { produce } from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
  bundlerInitialized: boolean;
  bundles: {
    [key: string]: {
      loading: boolean;
      code: string;
      error: string;
    } | undefined
  }
}

const initialState: BundlesState = {
  bundlerInitialized: false,
  bundles: {}
}

const reducer = produce((state: BundlesState, action: Action) => {
  switch (action.type) {
    case ActionType.INITIALIZE_BUNDLER:
      state.bundlerInitialized = true;
      break;
    case ActionType.BUNDLE_START:
      state.bundles[action.payload.cellId] = {
        loading: true,
        code: '',
        error: '',
      }
      break;
    case ActionType.BUNDLE_COMPLETE:
      state.bundles[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      }
      break;
    default:
      return state;
  }
}, initialState);

export default reducer;
