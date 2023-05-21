import React, { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector(s => s.bundles[cell.id]);

  const cumulativeCode = useTypedSelector(s => {
    const { data, order } = s.cells;
    const orderedCells = order.map(id => data[id]);

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        const _root = document.querySelector('#root');
        var show = (value) => {
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, _root);
            } else {
              _root.innerHTML = JSON.stringify(value);
            }
          } else {
            _root.innerHTML = value;
          }
        }
      `;

    const showFuncNoOp = 'var show = () => {}';

    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.id === cell.id ? showFunc : showFuncNoOp);
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  const cumulativeCodeAsString = cumulativeCode.join('\n');

  const isBundle = !!bundle;
  useEffect(() => {
    if (!isBundle) {
      createBundle(cell.id, cumulativeCodeAsString);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCodeAsString);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }

  }, [cell.id, cell.content, createBundle, isBundle, cumulativeCodeAsString]);

  return (
    <div className="code-cell">
      <Resizable direction="vertical">
        <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction="horizontal">
            <CodeEditor initialValue={cell.content} onChange={value => updateCell(cell.id, value)}/>
          </Resizable>

          <div className="progress-wrapper">
            {!bundle || bundle.loading ? (
              <div className="progress-cover">
                <progress className="progress is-small is-primary" max="100%">Loading</progress>
              </div>
            ) : (
              <Preview code={bundle.code} bundlingStatus={bundle.error}/>
            )
            }
          </div>
        </div>
      </Resizable>
    </div>
  );
}

export default CodeCell;
