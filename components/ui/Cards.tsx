import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function Cards({data}: any) {
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
  });
  console.log(data);
  return (
    <View style={styles.card}>
      <Text style={styles.head}>{data.type}</Text>
      <View style={styles.circle}>
        <Text style={styles.circleText}> {'>'}</Text>
      </View>
    </View>
  );
}
