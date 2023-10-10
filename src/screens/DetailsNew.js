import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppStyle } from '../constants/AppStyle'
import { useNavigation } from '@react-navigation/native'
import AxiosInstance from '../constants/AxiosInstance';
import { AppContext } from '../utils/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR } from '../constants/Theme'
import Share from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';
const DetailsNew = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [dataNewsById, setDataNewsById] = useState({})
  const [date, setDate] = useState(undefined)
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);

  const getByIdNews = async () => {
    try {
      const response = await AxiosInstance().get("news/api/get-by-id?id=" + params.id);
      if (response.result) {
        setDataNewsById(response.news)
        setDate(response.news.date.slice(0, 10))
      }
    } catch (error) {
      console.log(error);
    }
  }
  const shareToFacebook = async () => {
    try {
      console.log("dataNewsById.image,", dataNewsById.image,);
      console.log("dataNewsById.title,", dataNewsById.title,);
      console.log("dataNewsById.content,", dataNewsById.content,);

      const shareOptions = {
        social: Share.Social.FACEBOOK,
        title: dataNewsById.title,
        subject: dataNewsById.title,
        message: dataNewsById.content,
        url: dataNewsById.image,
        filename:dataNewsById.image,
        // type:"postToFacebook",
        showAppsToView: true, // Hiển thị ứng dụng Facebook để xem trước khi chia sẻ
        failOnCancel: false, // Không báo lỗi nếu người dùng hủy chia sẻ
      };

      const shareResponse = await Share.open(shareOptions);
      console.log('Chia sẻ thành công:', shareResponse);
    } catch (error) {
      console.log('Lỗi chia sẻ:', error);
    }
  };

  useEffect(() => {
    getByIdNews()
    return () => {

    }
  }, [appState])

  return (
    <SafeAreaView style={[AppStyle.container, { padding: 16,backgroundColor:'#FFF6CE' }]}>

      <View style={[AppStyle.row, { justifyContent: 'space-between'}]}>
        <TouchableOpacity style={[AppStyle.row, { alignItems: 'center' }]} onPress={() => { navigation.goBack() }}>
          <Image style={AppStyle.icon} source={require('../assets/icons/ic_back_black.png')} />
          <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}> Quay lại </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { shareToFacebook() }}>
          <Image style={[AppStyle.icon, { tintColor: COLOR.primary }]} source={require('../assets/icons/ic_share.png')} />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor:'#787878', width:'100%',height:0.5,marginTop:12}}></View>

      <Text style={[AppStyle.titleBig, { marginTop: 10 }]}>{dataNewsById.title}</Text>
      <View style={{width:'100%',height:'1%'}}></View>
      <View style={{backgroundColor:COLOR.background, padding:6,borderRadius:8}}>
        {/* <Text style={[AppStyle.titleBig, { color: 'black',right:"3%" ,margin:10}]}>
                {dataNewsById.title}
            </Text> */}
        <Text style={[AppStyle.title, { width: 350, textAlign: 'justify', marginTop: 10, color:'black' }]}>
          {dataNewsById.content}
        </Text>
        <Image style={{ width: "100%", height: 200, borderRadius: 10, top: "2%" }} source={{ uri: dataNewsById.image }} />
        <Text style={{ top: "3%", textAlign: 'justify', marginTop: 8,color:'black' }}>
          {dataNewsById.content}
        </Text>

        <View style={{ top: "10%", flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={AppStyle.titleMedium}>Người đăng:  {dataNewsById.author}</Text>
          <Text style={AppStyle.titleMedium}> Thời gian: {date}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default DetailsNew

const styles = StyleSheet.create({})