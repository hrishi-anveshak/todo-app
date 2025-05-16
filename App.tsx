import React from 'react';
import Home from './screens/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {store} from './redux/store';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.bg}>
      <Provider store={store}>
        <Home />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#FDFFFF',
  },
});
