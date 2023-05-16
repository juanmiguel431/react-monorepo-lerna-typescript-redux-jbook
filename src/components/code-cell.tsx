import React, { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useAppSelector } from '../hooks/use-app-selector';

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useAppSelector(s => s.bundles[cell.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [cell.id, cell.content]);

  return (
    <div className="code-cell">
      <Resizable direction="vertical">
        <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction="horizontal">
            <CodeEditor initialValue={cell.content} onChange={value => updateCell(cell.id, value)}/>
          </Resizable>
          {bundle && <Preview code={bundle.code} bundlingStatus={bundle.error}/>}
        </div>
      </Resizable>
    </div>
  );
}

export default CodeCell;
