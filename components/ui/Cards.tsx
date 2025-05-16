import React, {useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSheet,
  setBottomSheetRef,
  setFilteredStatus,
} from '../../redux/todoList/todoListSlice';
import {RootState} from '../../redux/store';
export default function Cards({data}: any) {
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: data.color,
      height: 155,
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      padding: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: -5},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 15,
      zIndex: 10,
    },
    head: {
      color: data.fontColor,
      fontFamily: 'Poppins-Bold',
      fontSize: 25,
    },
    circle: {
      backgroundColor: data.circle,
      width: 35,
      height: 35,
      borderRadius: 100,
    },
    circleText: {
      textAlign: 'center',
      paddingRight: 3,
      fontSize: 23,
      fontFamily: 'Poppins-Bold',
    },
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
      padding: 36,
      alignItems: 'center',
    },
  });

  const bottomSheetRef = useSelector(
    (state: RootState) => state.todo.bottomSheetRef,
  );
  const handlePresentModalPress = () => {
    dispatch(setSheet(true));
    dispatch(setBottomSheetRef(!bottomSheetRef));
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        handlePresentModalPress();
        dispatch(setFilteredStatus(data.type));
      }}>
      <Text style={styles.head}>{data.type}</Text>
      <View style={styles.circle}>
        <Text style={styles.circleText}> {'>'}</Text>
      </View>
    </TouchableOpacity>
  );
}
