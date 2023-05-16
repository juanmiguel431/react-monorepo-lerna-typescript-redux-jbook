import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { actions } from '../state';
import { useAppDispatch } from './use-app-dispatch';

export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch])
};
