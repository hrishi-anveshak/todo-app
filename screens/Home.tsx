import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CounterContext} from '../utils/ContextApi';
export default function Home() {
  const {count, increment, decrement, reset}: any = useContext(CounterContext);
  return (
    <View>
      <Text style={styles.text}>{count}</Text>
      <TouchableOpacity onPress={increment}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decrement}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 120,
  },
});
