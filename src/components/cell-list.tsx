import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import './cell-list.css';
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));

  const { fetchCells, saveCells, initializeBundler } = useActions();

  useEffect(() => {
    initializeBundler();
  }, [initializeBundler]);

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const cellsStringify = JSON.stringify(cells);

  useEffect(() => {
    saveCells();
  }, [cellsStringify, saveCells]);

  const renderedCells = cells.map(cell => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell}/>
      <AddCell previousCellId={cell.id}/>
    </React.Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null}/>
      {renderedCells}
    </div>
  );
}

export default CellList;
