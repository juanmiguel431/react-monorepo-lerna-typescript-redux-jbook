import React from 'react';
import { Cell } from '../state';
import CodeEditor from './code-editor';
import TextEditor from './text-editor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {

  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <CodeEditor/>;
  } else {
    child = <TextEditor/>;
  }

  return (
    <div className="cell-list-item">
      {child}
    </div>
  );
}

export default CellListItem;
