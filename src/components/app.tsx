import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state';
// import CodeCell from './code-cell';
import TextEditor from './text-editor';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        {/*<CodeCell />*/}
        <TextEditor/>
      </div>
    </Provider>
  );
}

export default App;
