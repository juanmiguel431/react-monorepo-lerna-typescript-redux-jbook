import React from 'react';
import { useAppSelector } from '../hooks/use-app-selector';

const CellList: React.FC = () => {

  useAppSelector(state => state);

  return (
    <div className="cell-list">
      Cell list
    </div>
  );
}

export default CellList;
