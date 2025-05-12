import React from 'react';
import Home from './screens/Home';
import {CounterProvider} from './utils/ContextApi';

function App(): React.JSX.Element {
  return (
    <CounterProvider>
      <Home />
    </CounterProvider>
  );
}

export default App;
