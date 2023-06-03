import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import { produce } from 'immer';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      break;
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      break;
    case ActionType.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map(p => p.id);

      state.data = action.payload.reduce((acc, c) => {
        acc[c.id] = c;
        return acc;
      }, {} as CellsState['data']);

      state.loading = false;
      state.error = null;
      break;
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      break;
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      break;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload]
      state.order = state.order.filter(a => a !== action.payload);
      break;
    case ActionType.MOVE_CELL:

      const { direction } = action.payload;

      const index = state.order.findIndex(a => a === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      break;
    case ActionType.INSERT_CELL_BEFORE:

      const cell: Cell = {
        type: action.payload.type,
        content: '',
        id: randomId()
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(a => a === action.payload.id);
      if (foundIndex === -1) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }

      break;
    case ActionType.INSERT_CELL_AFTER: {
      const cell: Cell = {
        type: action.payload.type,
        content: '',
        id: randomId()
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(a => a === action.payload.id);
      if (foundIndex === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
    }
      break;
    default:
      return state;
  }
}, initialState);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
}

export default reducer;
