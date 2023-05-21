import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector(s => {
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
        cumulativeCode.push(c.id === cellId ? showFunc : showFuncNoOp);
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
}
