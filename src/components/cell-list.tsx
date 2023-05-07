import React from 'react';
import { useAppSelector } from '../hooks/use-app-selector';
import CellListItem from './cell-list-item';
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
  const { insertCellBefore, moveCell } = useActions();
  const cells = useAppSelector(({ cells: { order, data}  }) => order.map((id) => data[id]));

  const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell} /> );

  return (
    <div className="cell-list">
      {renderedCells}
    </div>
  );
}

export default CellList;

