import './add-cell.css'
import React from 'react';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();

  return (
    <div className="add-cell">
      <button onClick={_ => insertCellBefore(nextCellId, 'code')}>Code</button>
      <button onClick={_ => insertCellBefore(nextCellId, 'text')}>Text</button>
    </div>
  );
}

export default AddCell;
