import { StyleSheet, Text, SafeAreaView, View, Image, TextInput, Pressable, useWindowDimensions, ScrollView } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React,{useState,useEffect,useContext} from 'react'
import { AppStyle } from '../constants/AppStyle'
import { COLOR } from '../constants/Theme'
import AppHeader from '../components/AppHeader'
import Activate from '../screens/Activate'
import Study from '../screens/Study'
import Enterprise from '../screens/Enterprise'
import { AppContext } from '../utils/AppContext';
import AxiosInstance from '../constants/AxiosInstance';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const options = ({ route }) => ({
  tabBarLabel: ({ focused, color, size }) => {
    if (route.name === 'Study') {
      return <Text style={{
        color: focused ? "#F26F25" : '#787878',
        fontSize:15,
        fontWeight:'600'
      }}>Học Tập</Text>
    } else if (route.name === 'Activate') {
      return <Text style={{
        color: focused ? "#F26F25" : '#787878',
        fontSize:15,
        fontWeight:'600'
      }}>Hoạt Động</Text>
    }else if (route.name === 'Enterprise') {
      return <Text style={{
        color: focused ? "#F26F25" : '#787878',
        fontSize:15,
        fontWeight:'600'
      }}>Doanh Nghiệp</Text>
    }
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#F26F25',
    width: "15%",
    height: 3,
    borderRadius: 40,
    left:'9%',
  },
  tabBarStyle: {
    backgroundColor: 'white',
  },
})


const News = (props) => {
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataCurrentNews, setDataCurrentNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

 
  const getAllNews = async () => {
    try {
      // const response = await AxiosInstance().get("SchedulesSubject/api/get-by-current-day&currentDay=" + currentDay);
      const response = await AxiosInstance().get("/news/api/get-all");

      if (response.result) {
        setDataCurrentNews(response.SchedulesSubject);
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getAllNews()
    return () => {

    }
  }, [appState])

  return (
    <SafeAreaView style={AppStyle.container}>
      <AppHeader style={{ height: "45%", }} />
      <Tab.Navigator screenOptions={options} >
        <Tab.Screen name='Study' component={Study} />
        <Tab.Screen name='Activate' component={Activate} />    
        <Tab.Screen name='Enterprise' component={Enterprise} />    
      </Tab.Navigator>
    </SafeAreaView>
  );

}

export default News

const styles = StyleSheet.create({
  BoxContent: {
    backgroundColor: COLOR.background2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    height: '100%',
    width: '100%',

    paddingHorizontal: 16,
    paddingVertical: 20,
  },

})
