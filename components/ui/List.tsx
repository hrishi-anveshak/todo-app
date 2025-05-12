import React, {useContext} from 'react';
import {CounterContext} from '../../utils/ContextApi';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
export default function List() {
  const {todo}: any = useContext(CounterContext);
  return (
    <View style={styles.bg}>
      <Modal animationType="slide" visible={true}>
        <View>
          {todo.map((val: any, index: any) => {
            return (
              <View key={index} style={styles.task}>
                <Text>{val.title}</Text>
                <Text>{val.description}</Text>
                <Text>{val.date}</Text>
                <Text>{val.status}</Text>
              </View>
            );
          })}
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#FDFFFF',
  },
  task: {
    width: '45%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
});
