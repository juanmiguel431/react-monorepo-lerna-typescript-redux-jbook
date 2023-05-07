import React from 'react';
import { useActions } from '../hooks/use-actions';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {

  const { deleteCell, moveCell } = useActions();

  return (
    <div className="action-bar">
      <button onClick={_ => moveCell(id, 'up')}>Up</button>
      <button onClick={_ => moveCell(id, 'down')}>Down</button>
      <button onClick={_ => deleteCell(id)}>Delete</button>
    </div>
  );
}

export default ActionBar;
