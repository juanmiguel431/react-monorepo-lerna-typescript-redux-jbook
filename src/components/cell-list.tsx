import React from 'react';
import { useAppSelector } from '../hooks/use-app-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: React.FC = () => {
  const cells = useAppSelector(({ cells: { order, data}  }) => order.map((id) => data[id]));

  const renderedCells = cells.map(cell => (
    <React.Fragment key={cell.id} >
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </React.Fragment>
  ) );

  return (
    <div className="cell-list">
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  );
}

export default CellList;

