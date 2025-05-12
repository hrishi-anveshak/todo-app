import React, {useContext} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {CounterContext} from '../../utils/ContextApi';

export default function AddTask() {
  const {modalVisible, modalView}: any = useContext(CounterContext);
  console.log(modalVisible);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={modalView}>
      <View style={styles.modal}>
        <Text>Hi</Text>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    width: 100,
    height: 100,
  },
});
