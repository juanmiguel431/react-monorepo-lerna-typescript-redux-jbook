import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import bundle from '../../bundle';
import axios from 'axios';
import { RootState } from '../store';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id: id,
      content: content
    }
  }
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id
  }
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id: id,
      direction: direction
    }
  }
};
export const insertCellBefore = (id: string | null, cellType: CellTypes): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id: id,
      type: cellType
    }
  }
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id: id,
      type: cellType
    }
  }
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId: cellId
      }
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId: cellId,
        bundle: result
      }
    })
  }
}

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS, });

    try {
      const { data } = await axios.get<Cell[]>('/cells');
      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: err.message });
      }
    }
  }
}

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: RootState) => {
    const { cells: { data, order } } = getState;
    const cells = order.map(id => data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: err.message });
      }
    }
  }
}
