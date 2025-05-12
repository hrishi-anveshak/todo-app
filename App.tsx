import React from 'react';
import Home from './screens/Home';
import {CounterProvider} from './utils/ContextApi';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.bg}>
      <CounterProvider>
        <Home />
      </CounterProvider>
    </SafeAreaProvider>
  );
}

export default App;
const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#FDFFFF',
  },
});
