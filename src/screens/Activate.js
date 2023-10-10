import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR } from '../constants/Theme'
import { AppStyle } from '../constants/AppStyle'
import ItemActivate from '../components/New/ItemActivate'

import { AppContext } from '../utils/AppContext';
import AxiosInstance from '../constants/AxiosInstance';

const Activate = () => {
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataCurrentNews, setdataCurrentNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllNews = async () => {
    try {
      const response = await AxiosInstance().get("/news/api/search-by-category?id=64c7b309704c7286d864e646");
      if (response.result) {
        setdataCurrentNews(response.news.reverse());
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
    <SafeAreaView style={[styles.BoxContent,{paddingBottom:95}]} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
          {isLoading ?
            (<Image
              source={require('../assets/gif/loading_circle.jpg')}
              style={{ width: 150, height: 100, alignSelf: 'center', }} />)
            : (<FlatList
              vertical
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={dataCurrentNews}
              renderItem={({ item }) => <ItemActivate data={item} />}
              keyExtractor={item => item.id}
            />)}
      </ScrollView>
    </SafeAreaView>
  )

}

export default Activate
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