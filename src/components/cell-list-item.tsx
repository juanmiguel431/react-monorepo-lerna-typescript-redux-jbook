import React from 'react';
import { Cell } from '../state';
import TextEditor from './text-editor';
import CodeCell from './code-cell';
import ActionBar from './action-bar';
import './cell-list-item.css';
import { LayoutGroup, motion } from 'framer-motion';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {

  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <>
      <LayoutGroup>
        <motion.div layout>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id}/>
          </div>
          <CodeCell cell={cell}/>
        </motion.div>
      </LayoutGroup>
    </>;
  } else {
    child = <>
      <LayoutGroup>
        <motion.div layout>
          <TextEditor cell={cell}/>
          <ActionBar id={cell.id}/>
        </motion.div>
      </LayoutGroup>
    </>;
  }

  return (
    <div className="cell-list-item">
      {child}
    </div>
  );
}

export default CellListItem;
