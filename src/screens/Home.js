import { SafeAreaView, StyleSheet, Text, Image, View, ScrollView, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { AppStyle } from '../constants/AppStyle'
import AppHeader from '../components/AppHeader'
import Swiper from 'react-native-swiper'
import { COLOR } from '../constants/Theme'
import { AppContext } from '../utils/AppContext'
import AxiosInstance from '../constants/AxiosInstance';
import FastImage from 'react-native-fast-image';
import ItemScheduleToday from '../components/Home/ItemScheduleToday'
import ItemNews from '../components/Home/ItemNews'
import ItemNewsEnterprise from '../components/Home/ItemNewsEnterprise'
import LoadingHome1 from '../components/Loading/LoadingHome1'

const Home = () => {
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataCurrentSchedule, setDataCurrentSchedule] = useState([])
  const [dataNewsActivate, setDataNewsActivate] = useState([])
  const [dataNewsEnterprise, setDataNewsEnterprise] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getCurrentSchedule = async () => {
    try {
      const response = await AxiosInstance().get("scheduleStudy/api/get-by-current-day?currentDay=" + currentDay);

      console.log(response.scheduleStudy);
      const responseActivate = await AxiosInstance().get("news/api/search-by-category?id=64c7b309704c7286d864e646");
      const responseEnterprise = await AxiosInstance().get("news/api/search-by-category?id=64c7b313704c7286d864e648");
      for (let i = 0; i < response.scheduleStudy.length; i++) {
      }
      if (response.result) {
        setDataCurrentSchedule(response.scheduleStudy);
        setDataNewsActivate(responseActivate.news)
        setDataNewsEnterprise(responseEnterprise.news)
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCurrentSchedule()
    return () => {

    }
  }, [appState])

  return (
    <SafeAreaView style={AppStyle.container}>
      <AppHeader />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper} >
          <Swiper showsButtons={false} autoplay={true} showsPagination={false} >
            <View style={styles.slide}>
              <FastImage style={styles.image} source={require('../assets/images/Banner1.png')} />
            </View>
            <View style={styles.slide}>
              <FastImage style={styles.image} source={require('../assets/images/Banner2.png')} />
            </View>
            <View style={styles.slide}>

              <FastImage style={styles.image} source={require('../assets/images/Banner3.jpg')} />
            </View>
          </Swiper>
        </View>

        <View style={styles.BoxContent} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={[AppStyle.column, { display: dataCurrentSchedule.length > 0 ? 'flex' : 'none', marginBottom: 20 }]}>
            <Text style={AppStyle.titleBig}>Lịch học hôm nay</Text>
            {isLoading ?
              (<FastImage
                source={require('../assets/gif/loading_bar.gif')}
                style={{ width: 150, height: 100, alignSelf: 'center', }} />)
              :
              (<FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={dataCurrentSchedule}
                renderItem={({ item }) => <ItemScheduleToday data={item} />}
                keyExtractor={item => item.id}
              />
              )}
          </View>

          <View style={[AppStyle.column]}>
            <Text style={AppStyle.titleBig}>Tin tức mới !</Text>
            {
              isLoading ?
                (<LoadingHome1 />)
                :
                (<FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={dataNewsActivate}
                  renderItem={({ item }) => <ItemNews data={item} />}
                  keyExtractor={item => item.id}
                />)
            }
          </View>

          <View style={[AppStyle.column, { marginTop: 20, marginBottom: 80 }]}>
            <Text style={[AppStyle.titleBig, { marginBottom: 6 }]}>Tin tức doanh nghiệp !</Text>
            <FlatList
              // numColumns={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              // vertical
              horizontal
              data={dataNewsEnterprise}
              renderItem={({ item }) => <ItemNewsEnterprise data={item} />}
              keyExtractor={item => item.id}
            />

          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor={COLOR.background} barStyle="dark-content" />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  wrapper: {
    height: 180,
    borderRadius: 20,

  },
  slide: {
    height: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.background
  },
  image: {
    width: '95%',
    height: 180,
    borderWidth: 2,
    borderColor: COLOR.background,
    borderRadius: 20,

  },
  BoxContent: {
    backgroundColor: COLOR.background2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
})