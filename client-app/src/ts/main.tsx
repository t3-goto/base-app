import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../scss/main.scss';

const App = () => {
  return (
    <div>
      <h1>Hello React!</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
