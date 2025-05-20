import React, {useContext, useState, useCallback, useEffect} from 'react';
import {Calendar} from 'react-native-calendars';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  toggleModal,
  addTodo,
  editTodo,
} from '../../redux/todoList/todoListSlice';
import type {RootState} from '../../redux/store';
import {Picker} from '@react-native-picker/picker';

interface DateType {
  dateString?: string;
  date?: string;
  status?: string;
  title?: string;
  description?: string;
}
export default function AddTask() {
  const initialState = {
    title: '',
    description: '',
    date: '',
    status: 'Ongoing',
  };

  const dispatch = useDispatch();
  const {modalVisible} = useSelector((state: RootState) => state.todo);
  const edit = useSelector((state: RootState) => state.todo.edit?.val);

  const handleOnChange = (val: any, name: string) => {
    console.log(data);
    setData(prev => ({
      ...prev,
      [name]: val.replace(/^\s+/g, ''),
    }));
    setErrData({...errData, [name]: ''});
  };

  const [data, setData] = useState<DateType>({
    ...initialState,
  });
  const [errData, setErrData] = useState({
    ...initialState,
    status: '',
  });

  const [calendarVisible, setCalendarVisible] = useState(false);

  const generateId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  };

  const saveData = () => {
    try {
      let isValid = true;
      let cpyErr = {...errData};
      Object.keys(data).map(key => {
        if (data[key].length === 0) {
          isValid = false;
          cpyErr[key] = `Please enter valid ${key}`;
        }
      });
      setErrData(cpyErr);
      if (isValid) {
        if (edit?.id !== undefined) {
          dispatch(editTodo({...data}));
        } else {
          dispatch(addTodo({...data, id: generateId()}));
        }

        setData({...initialState});
        dispatch(toggleModal());
      }
      console.log(data);
      // if (!data.date || !data.description || !data.title) {
      //   setValidation(false);
      //   return;
      // } else {
      //   setValidation(true);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const onClose = () => {
    dispatch(toggleModal());
    setData({...initialState});
    setCalendarVisible(false);
  };
  useEffect(() => {
    if (edit?.id) {
      setData({...edit});
      console.log(edit);
    }
  }, [edit]);
  useEffect(() => {
    setErrData({...initialState});
  }, [modalVisible]);

  return (
    <KeyboardAvoidingView behavior="position">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={[
          styles.modalBox,
          edit?.length === 0 ? {zIndex: 1000} : {zIndex: 1000},
        ]}
        onRequestClose={onClose}>
        <Pressable style={styles.back} onPress={onClose}></Pressable>
        <View style={styles.modal}>
          <Text style={styles.head}>
            {edit?.id !== undefined ? 'Edit Task' : 'Add Task'}
          </Text>
          <View style={styles.userInput}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#000"
              value={edit && data?.title}
              onChangeText={val => handleOnChange(val, 'title')}
            />
            <Text style={styles.validationText}>{errData.title}</Text>

            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#000"
              onChangeText={val => handleOnChange(val, 'description')}
              value={edit && data?.description}
            />
            <Text style={styles.validationText}>{errData.description}</Text>
            <View style={styles.datePicker}>
              <Pressable>
                <View style={styles.calendar}>
                  <Text style={styles.date}>Date:</Text>

                  {data?.date ? (
                    <Pressable
                      onPress={() => setCalendarVisible(!calendarVisible)}>
                      <Text style={styles.chooseDateActive}>{data?.date}</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        Keyboard.dismiss();
                        setCalendarVisible(!calendarVisible);
                      }}>
                      <Text style={styles.chooseDate}>Choose Date</Text>
                    </Pressable>
                  )}
                </View>
              </Pressable>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                  paddingTop: 4,
                  paddingLeft: 25,
                }}>
                Status:
              </Text>
              <Picker
                style={styles.picker}
                selectedValue={data?.status}
                dropdownIconColor="#000"
                onValueChange={(itemValue, itemIndex) =>
                  handleOnChange(itemValue, 'status')
                }>
                <Picker.Item
                  style={{fontSize: 14}}
                  label="Ongoing"
                  value="Ongoing"
                />
                <Picker.Item
                  style={{fontSize: 14}}
                  label="Pending"
                  value="Pending"
                />
                <Picker.Item
                  style={{fontSize: 14}}
                  label="Completed"
                  value="Completed"
                />
              </Picker>
            </View>
            <Text style={styles.validationText}>{errData.date}</Text>
          </View>
          {calendarVisible && (
            <Calendar
              onDayPress={day => {
                setData(prev => ({...prev, date: day.dateString}));
                setCalendarVisible(!calendarVisible);
              }}
              theme={{
                backgroundColor: '#FDFFFF',
                calendarBackground: '#FDFFFF',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                arrowColor: 'orange',
                monthTextColor: 'blue',
                textDayFontSize: 12,
                textMonthFontSize: 14,
                textDayHeaderFontSize: 10,
              }}
            />
          )}
          <TouchableOpacity style={styles.saveBtn} onPress={() => saveData()}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  modalBox: {
    justifyContent: 'center',
    margin: 'auto',
    width: 100,
    height: 100,
  },
  back: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    position: 'absolute',
  },
  modal: {
    marginHorizontal: 'auto',
    position: 'relative',
    top: 170,
    width: '90%',
    backgroundColor: '#FDFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 30,
    zIndex: 50,
  },
  head: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 30,
  },
  userInput: {
    width: '90%',
    marginHorizontal: 'auto',
  },
  input: {
    borderColor: '#d6d6d6',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 20,
    fontSize: 14,
    color: '#000',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginVertical: 10,
    marginLeft: 10,
  },
  chooseDate: {
    fontSize: 14,

    color: '#b3b3b3',
    fontFamily: 'Poppins-Regular',
  },
  chooseDateActive: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingTop: 4,
  },
  datePicker: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    color: '#000',
    borderColor: '#000',
    width: '40%',
  },
  saveBtn: {
    backgroundColor: '#000',
    width: 80,
    borderRadius: 10,
    paddingVertical: 5,
    margin: 'auto',
    marginBottom: 15,
  },
  saveText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  validationText: {
    color: '#900',
    fontSize: 12,
    paddingLeft: 10,
  },
});
