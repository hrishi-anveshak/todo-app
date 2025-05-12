import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CounterContext} from '../utils/ContextApi';
import Cards from '../components/ui/Cards';
import AddTask from '../components/ui/Task';

export default function Home() {
  const {modalView, modalVisible}: any = useContext(CounterContext);
  const types = [
    {
      type: 'Ongoing',
      color: '#FFE7A0',
      fontColor: '#453210',
      circle: '#FFCB20',
    },
    {
      type: 'Pending',
      color: '#B7F0FF',
      fontColor: '#0E3946',
      circle: '#53DAFE',
    },
    {
      type: 'Completed',
      color: '#CDFFB9',
      fontColor: '#1E4113',
      circle: '#82F258',
    },
  ];
  console.log(modalVisible);
  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headText}>TO_DO</Text>
        <Text style={styles.sub}>
          Turn intentions into action with a smart, simple to-do experience.
        </Text>
      </View>
      {/* Add */}
      <TouchableOpacity onPress={modalView} style={styles.addButton}>
        <Text style={styles.add}>+</Text>
      </TouchableOpacity>
      {/* Cards */}
      <View style={styles.workSection}>
        {types.map((val, index) => {
          return (
            <View key={index} style={styles.workCards}>
              <Cards data={val} />
            </View>
          );
        })}
      </View>

      {/* Modal */}
      <View style={styles.modal}>
        <AddTask />
      </View>
      {/* Sheet */}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginHorizontal: 20,
    marginTop: 100,
    flex: 1,
    position: 'relative',
  },
  sub: {
    color: '#8E8E8E',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  headText: {
    fontSize: 50,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  addButton: {
    justifyContent: 'center',
    margin: 'auto',
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: '#000',
    marginTop: 25,
  },
  add: {
    color: '#fff',
    fontSize: 55,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  workSection: {
    marginTop: 130,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  workCards: {
    marginTop: -20,
  },
  modal: {
    justifyContent: 'center',
    margin: 'auto',
    width: 100,
    height: 100,
  },
});
