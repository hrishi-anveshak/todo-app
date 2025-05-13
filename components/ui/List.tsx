import React, {useContext} from 'react';
import {CounterContext} from '../../utils/ContextApi';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {View, Text, Button, StyleSheet} from 'react-native';
export default function List() {
  const {todo, handleSheetChanges, bottomSheetModalRef, sheet}: any =
    useContext(CounterContext);

  return (
    <GestureHandlerRootView style={[styles.container, sheet && {zIndex: 100}]}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={['100%']}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
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
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
