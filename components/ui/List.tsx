import React, {useContext} from 'react';
import {CounterContext} from '../../utils/ContextApi';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {View, Text, StyleSheet} from 'react-native';

export default function List() {
  const {handleSheetChanges, bottomSheetModalRef, sheet}: any =
    useContext(CounterContext);

  const newData = [
    {
      name: 'Buy groceries',
      description:
        'Purchase milk, eggs, and bread from the supermarket. Don’t forget to check for sales or discounts. Make sure to buy some fresh fruits and vegetables as well.',
      date: '2025-05-13',
      status: 'Ongoing',
    },
    {
      name: 'Workout',
      description:
        '1-hour gym session focusing on strength training. Start with a warm-up, followed by exercises targeting major muscle groups. Make sure to stretch after the workout to prevent injuries.',
      date: '2025-05-13',
      status: 'Ongoing',
    },
    {
      name: 'Read book',
      description:
        'Finish reading Chapter 4 of Atomic Habits. Take notes on important insights, and review the previous chapters to understand how to build habits effectively.',
      date: '2025-05-14',
      status: 'Ongoing',
    },
    {
      name: 'Team meeting',
      description:
        'Discuss project milestones and blockers. Prepare a status update on the current tasks and present the challenges faced in the ongoing sprint. Make sure to note down the action points.',
      date: '2025-05-12',
      status: 'Completed',
    },
    {
      name: 'Submit report',
      description:
        'Final submission of quarterly sales report. Double-check the numbers and ensure all relevant data is included. Review the report for any grammatical errors before submitting.',
      date: '2025-05-10',
      status: 'Completed',
    },
    {
      name: 'Pay electricity bill',
      description:
        'Use online banking to pay the electricity bill. Confirm the due amount and verify the payment details before proceeding. Make sure to get a confirmation receipt.',
      date: '2025-05-11',
      status: 'Completed',
    },
    {
      name: 'Call plumber',
      description:
        'Fix the leaking kitchen tap. Make sure to ask about any additional plumbing issues that might need attention. Schedule a follow-up if required.',
      date: '2025-05-15',
      status: 'Pending',
    },
    {
      name: 'Doctor appointment',
      description:
        'Routine checkup with Dr. Smith at 4 PM. Don’t forget to bring the previous test results for review. Prepare any questions regarding your health to discuss during the appointment.',
      date: '2025-05-16',
      status: 'Pending',
    },
    {
      name: 'Renew subscription',
      description:
        'Renew cloud storage subscription for 1 year. Check for any promotional offers available and make sure to keep a record of the transaction for future reference.',
      date: '2025-05-18',
      status: 'Pending',
    },
    {
      name: 'Design logo',
      description:
        'Draft initial logo concepts for client project. Include a variety of color schemes and designs for the client to choose from. Prepare a presentation of the top 3 ideas.',
      date: '2025-05-17',
      status: 'Ongoing',
    },
  ];

  const colorPalette = [
    {
      background: '#FFDAC1',
      headingColor: '#3C1E10',
      descriptionColor: '#4E3B28',
      dateColor: '#5A4B42',
      statusColor: '#9A2C00',
    },
    {
      background: '#FFE5B4',
      headingColor: '#3E2C00',
      descriptionColor: '#5E4724',
      dateColor: '#7A6231',
      statusColor: '#9E5314',
    },
    {
      background: '#D8E2DC',
      headingColor: '#1F2B2B',
      descriptionColor: '#384545',
      dateColor: '#5F6A6A',
      statusColor: '#006151',
    },
    {
      background: '#FCD5CE',
      headingColor: '#4F1A1A',
      descriptionColor: '#693B3B',
      dateColor: '#7F4949',
      statusColor: '#9A0C0C',
    },
    {
      background: '#FAEDCB',
      headingColor: '#4A3C15',
      descriptionColor: '#654B1E',
      dateColor: '#7D6931',
      statusColor: '#D15B00',
    },
    {
      background: '#E2ECE9',
      headingColor: '#1E2A33',
      descriptionColor: '#364954',
      dateColor: '#56667A',
      statusColor: '#004A42',
    },
    {
      background: '#F6EAC2',
      headingColor: '#4A3815',
      descriptionColor: '#6D5229',
      dateColor: '#8E6F38',
      statusColor: '#C14A00',
    },
    {
      background: '#CDE4DE',
      headingColor: '#142E2E',
      descriptionColor: '#2B4444',
      dateColor: '#445D5D',
      statusColor: '#00584F',
    },
    {
      background: '#FFC9DE',
      headingColor: '#4E1026',
      descriptionColor: '#6D2E42',
      dateColor: '#8D4C6B',
      statusColor: '#9B0F47',
    },
    {
      background: '#FFDBB5',
      headingColor: '#4B2806',
      descriptionColor: '#65472A',
      dateColor: '#7F5E3A',
      statusColor: '#9E2A04',
    },
    {
      background: '#D0E8F2',
      headingColor: '#002A47',
      descriptionColor: '#1F4E66',
      dateColor: '#3C6C7A',
      statusColor: '#015E8B',
    },
    {
      background: '#E9D5CA',
      headingColor: '#3C251C',
      descriptionColor: '#564237',
      dateColor: '#6D4F41',
      statusColor: '#7D6A5C',
    },
    {
      background: '#FFF5BA',
      headingColor: '#4A3F00',
      descriptionColor: '#645B26',
      dateColor: '#7E6F41',
      statusColor: '#C68900',
    },
    {
      background: '#DDEBF7',
      headingColor: '#1A2431',
      descriptionColor: '#2E3F54',
      dateColor: '#475A6B',
      statusColor: '#0E4D8C',
    },
    {
      background: '#E7D1FC',
      headingColor: '#3B145D',
      descriptionColor: '#573175',
      dateColor: '#75598F',
      statusColor: '#7A1D8E',
    },
  ];

  const getRandomColor = () =>
    colorPalette[Math.floor(Math.random() * colorPalette.length)];

  return (
    <GestureHandlerRootView
      style={[styles.container, sheet ? {zIndex: 100} : {zIndex: -1}]}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={['100%']}
          enableDynamicSizing={true}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          enablePanDownToClose
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
              {newData.map((val: any, index: number) => {
                const randomColor = getRandomColor();
                return (
                  <View
                    key={index}
                    style={[
                      styles.task,
                      {backgroundColor: randomColor.background},
                    ]}>
                    <Text
                      numberOfLines={2}
                      style={[styles.head, {color: randomColor.headingColor}]}>
                      {val.name}
                    </Text>

                    <Text
                      style={[
                        styles.des,
                        {color: randomColor.descriptionColor},
                      ]}>
                      {val.description}
                    </Text>
                    <View style={[styles.dateStatus, {marginTop: 'auto'}]}>
                      <Text
                        style={[
                          styles.status,
                          {color: randomColor.statusColor},
                        ]}>
                        {val.status}
                      </Text>
                      <Text
                        style={[styles.date, {color: randomColor.dateColor}]}>
                        {val.date}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </BottomSheetScrollView>
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
    width: '49%',
    borderRadius: 20,
    borderColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },

  head: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  des: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    marginTop: 6,
  },

  date: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
  },
  status: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
  },

  dateStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
});
