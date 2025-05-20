import React from 'react';
import Home from './screens/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text} from 'react-native';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.bg}>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <Home />
        </PersistGate>
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
