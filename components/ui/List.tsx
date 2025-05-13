import React, {useContext, useCallback, useMemo, useRef} from 'react';
import {CounterContext} from '../../utils/ContextApi';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
export default function List() {
  const {todo}: any = useContext(CounterContext);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <View style={styles.bg}>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}>
            <BottomSheetView style={styles.contentContainer}>
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
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
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
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
