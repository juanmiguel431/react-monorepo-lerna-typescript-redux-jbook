import React from 'react';
import { Cell } from '../state';
import TextEditor from './text-editor';
import CodeCell from './code-cell';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {

  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <CodeCell cell={cell}/>;
  } else {
    child = <TextEditor cell={cell}/>;
  }

  return (
    <div className="cell-list-item">
      {child}
    </div>
  );
}

export default CellListItem;
