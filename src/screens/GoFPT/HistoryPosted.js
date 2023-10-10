import { StyleSheet, ActivityIndicator, FlatList, RefreshControl, Animated, Text, Image, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useContext, useRef, useCallback, useEffect, useState } from 'react'
import ItemSearch from '../../components/GoFPT/ItemSearch'
import ItemHistoryPosted from '../../components/GoFPT/ItemHistoryPosted'
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';
import ActionButton from 'react-native-action-button';
import TimerMixin from 'react-timer-mixin';
import Toast from 'react-native-toast-message';
import AppHeader from '../../components/AppHeader'
import { AppStyle } from '../../constants/AppStyle'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoryFindDriver from './HistoryFindDriver'
import HistoryFindGoWith from './HistoryFindGoWith'

const Tab = createMaterialTopTabNavigator();
const options = ({ route }) => ({
  swipeEnabled: false,
  tabBarLabel: ({ focused, color, size }) => {
    if (route.name === 'HistoryFindDriver') {
      return <Text style={{
        color: focused ? "#F26F25" : '#787878',
        fontSize: 18,
        fontWeight: '600'
      }}>Tìm tài xế</Text>
    } else if (route.name === 'HistoryFindGoWith') {
      return <Text style={{
        color: focused ? "#F26F25" : '#787878',
        fontSize: 18,
        fontWeight: '600'
      }}>Tìm yên sau</Text>
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


const HistoryPosted = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false)
  const [dataFindDriver, setDataFindDriver] = useState([])
  const [stateList, setStateList] = useState(0)
  const [refreshControl, setRefreshControl] = useState(false)
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);

  console.log(idUser, "idUser", infoUser);
  useEffect(() => {
    getListDriver()
    return () => {

    }
  }, [])

  const getListDriver = async () => {
    try {
      //gofpt/api/get-by-idUser?idUser=6507177073342287aa1b01fd&typeFind=1
      const response = await AxiosInstance().get("gofpt/api/get-by-idUser?idUser=" + idUser + "&typeFind=1");
      console.log("===================================response", response);
      if (response.result) {
        if (Array.isArray(response.post) && response.post.length === 0) {
          console.log("post là một mảng rỗng");
        } else {
          console.log("post không phải là một mảng rỗng");
          setIsLoading(false)
          setDataFindDriver(response.post);
        }
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <SafeAreaView style={AppStyle.container}>
      <AppHeader />

      <View style={AppStyle.main}>
        <View style={AppStyle.rowBtw}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Image style={{ width: 24, height: 24 }} source={require('../../assets/icons/ic_left.png')} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[AppStyle.text16, { fontSize: 18, fontWeight: '600', color: '#FF640D' }]}>Tin đã đăng</Text>
            {/* <View style={{ backgroundColor: '#FF640D', height: 4, borderRadius: 99, width: '100%', marginTop: 6 }} /> */}
          </View>
          <Text>   </Text>
        </View>

        <Tab.Navigator screenOptions={options} >
          <Tab.Screen name='HistoryFindDriver' component={HistoryFindDriver} />
          <Tab.Screen name='HistoryFindGoWith' component={HistoryFindGoWith} />
        </Tab.Navigator>


      </View>
    </SafeAreaView>
  )
}

export default HistoryPosted

const styles = StyleSheet.create({})