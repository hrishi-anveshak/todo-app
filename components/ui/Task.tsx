import React, {useContext, useState, useCallback} from 'react';
import {Calendar} from 'react-native-calendars';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CounterContext} from '../../utils/ContextApi';
import {Picker} from '@react-native-picker/picker';

interface DateType {
  dateString?: string;
}
export default function AddTask() {
  const {modalVisible, modalView, todo, addTodo}: any =
    useContext(CounterContext);

  const [data, setData] = useState<DateType>({});
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Ongoing');
  const descriptionChange = useCallback((text: string) => {
    setData(prev => ({...prev, description: text}));
  }, []);
  const titleChange = useCallback((text: string) => {
    setData(prev => ({...prev, title: text}));
  }, []);
  const statusChange = useCallback((text: string) => {
    setData(prev => ({...prev, status: text}));
  }, []);
  console.log(data);
  console.log(todo);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        modalView();
        setData({});
        setCalendarVisible(false);
      }}>
      <Pressable
        style={styles.back}
        onPress={() => {
          modalView();
          setData({});
          setCalendarVisible(false);
        }}></Pressable>
      <View style={styles.modal}>
        <Text style={styles.head}>Add Task</Text>
        <View style={styles.userInput}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#000"
            onChangeText={titleChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#000"
            onChangeText={descriptionChange}
          />
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
                    onPress={() => setCalendarVisible(!calendarVisible)}>
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
              selectedValue={selectedLanguage}
              dropdownIconColor="#000"
              onValueChange={(itemValue, itemIndex) => statusChange(itemValue)}>
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
              textDayFontSize: 12, // Smaller text
              textMonthFontSize: 14, // Smaller month text
              textDayHeaderFontSize: 10, // Smaller header
            }}
          />
        )}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            addTodo(data);

            setData({});
            modalView();
          }}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
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
    height: 320,
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
  },
  saveText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
