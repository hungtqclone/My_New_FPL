import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ScheduleStudy from './ScheduleStudy'
import ScheduleExam from './ScheduleExam'
import AppHeader from '../components/AppHeader'
import { AppStyle } from '../constants/AppStyle';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const options = ({ route }) => ({
  tabBarLabel: ({ focused, color, size }) => {
    if (route.name === 'ScheduleStudy') {
      return <Text style={{
        color: focused ? "#F26F25" : '#787878',
        fontSize: 18,
        fontWeight: '600'
      }}>Lịch Học</Text>
    } else if (route.name === 'ScheduleExam') {
      return <Text style={{
        color: focused ? "#F26F25" : '#787878',
        fontSize: 18,
        fontWeight: '600'
      }}>Lịch Thi</Text>
    }
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#F26F25',
    width: "15%",
    height: 3,
    borderRadius: 40,
    left: '18%',
  },
  tabBarStyle: {
    backgroundColor: 'white',
  },
})

const Schedule = () => {

  return (
    <SafeAreaView style={AppStyle.container}>
      <AppHeader style={{ height: "45%" }} />
      <Tab.Navigator screenOptions={options} >
        <Tab.Screen name='ScheduleStudy' component={ScheduleStudy} />
        <Tab.Screen name='ScheduleExam' component={ScheduleExam} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default Schedule

const styles = StyleSheet.create({})