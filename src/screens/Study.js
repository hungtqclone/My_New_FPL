import { View, Text, StyleSheet, Image, ScrollView, FlatList, } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStyle } from '../constants/AppStyle'
import { COLOR } from '../constants/Theme'
import ItemStudy from '../components/New/ItemStudy'
import dayjs from 'dayjs'


import { AppContext } from '../utils/AppContext';
import AxiosInstance from '../constants/AxiosInstance';
import Loading from '../components/Loading/Loading'
const DataNewsStudy = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Thông báo thay đổi giờ học Block 2',
    content: "Thông báo Thông báoThông báoThông báoThông báoThông báoThông báoThông báoThông báoThông asd báoThông báoThông báoThông báo Thông báoThông báoThông báo ...",
    name: "trunghieu",
    date: "20/01/2020"
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bdsadaa',

    title: 'Thông báo lịch thi',
    content: "Thông báo Thông báoThông báoThông báoThông báoThông báoThông báoThông báoThông báoThông asd báoThông báoThông báoThông báo Thông báoThông báoThông báo ...",
    name: "trunghieu",
    date: "20/07/2023"

  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b',
    title: 'Thông báo thay đổi giờ học Block 2',
    content: "Thông báo Thông báoThông báoThông báoThông báoThông báoThông báoThông báoThông báoThông asd báoThông báoThông báoThông báo Thông báoThông báoThông báo ...",
    name: "trunghieu",
    date: "22/07/2023"
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad5abb28bdsaa',

    title: 'Thông báo lịch thi',
    content: "Thông báo Thông báoThông báoThông báoThông báoThông báoThông báoThông báoThông báoThông asd báoThông báoThông báoThông báo Thông báoThông báoThông báo ...",
    name: "trunghieu",
    date: "24/07/2021"

  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-ad53abb28ba',
    title: 'Thông báo thay đổi giờ học Block 2',
    content: "Thông báo Thông báoThông báoThông báoThông báoThông báoThông báoThông báoThông báoThông asd báoThông báoThông báoThông báo Thông báoThông báoThông báo ...",
    name: "trunghieu",
    date: "23/07/2022"
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53a8bdsadaa',

    title: 'Thông báo lịch thii',
    content: "Thông báo Thông báoThông báoThông báoThông báoThông báoThông báoThông báoThông báoThông asd báoThông báoThông báoThông báo Thông báoThông báoThông báo ...",
    name: "trunghieu",
    date: "21/07/2023"

  },



]


export const dateNearThe = (max) => {
  max = DataNewsStudy[0].date

  for (let i = 0; i < DataNewsStudy.length; i++) {
    if (max < DataNewsStudy[i].date) {
      max = DataNewsStudy[i].date
    }

  }
  

  return max
}



const Study = (props) => {
  const { navigation } = props
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataCurrentNews, setdataCurrentNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllNews = async () => {
    try {
      const response = await AxiosInstance().get("/news/api/get-all");
      // console.log("===================================response", response.news[0]);
      if (response.result) {
        setdataCurrentNews(response.news);
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // console.log("INFOR ", infoUser);

    getAllNews()
    return () => {

    }
  }, [appState])
  return (
    <SafeAreaView style={styles.BoxContent} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", marginBottom: 75, }}>
        {/* <View style={[AppStyle.column]}>
          <View style={[AppStyle.column,]}>
            <Text style={AppStyle.titleBig}> Tin mới nhất </Text>
            <Image style={[AppStyle.iconMedium, { position: "absolute", left: 110, bottom: 2 }]} source={require('../assets/icons/ic_new.png')} />
          </View>
          {isLoading ?
            (<Loading />)
            : (<FlatList
              vertical
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={[dataCurrentNews[0]]}
              renderItem={({ item }) => <ItemStudy data={item} />}
              keyExtractor={item => item.id}
            />)}
        </View> */}
        <View style={[AppStyle.column,]}>
          {/* <View style={[AppStyle.column, { marginTop: 20 }]}>
            <Text style={AppStyle.titleBig}> Tin khác </Text>
          </View> */}
          {isLoading ?
            (<Loading />)
            : (<FlatList
              vertical
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={dataCurrentNews}
              renderItem={({ item }) => <ItemStudy data={item} />}
              keyExtractor={item => item.id}
            />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Study

const styles = StyleSheet.create({
  BoxContent: {
    backgroundColor: COLOR.background4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    height: '100%',
    width: '100%',

    paddingHorizontal: 16,
    paddingVertical: 20,
  },

})
