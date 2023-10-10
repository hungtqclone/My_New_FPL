import { SafeAreaView, Dimensions, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppStyle } from '../constants/AppStyle'
import { COLOR } from '../constants/Theme'
import { AppContext } from '../utils/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import FastImage from 'react-native-fast-image';

const { height } = Dimensions.get('window');

const AppHeader = () => {
  const navigation = useNavigation();
  const { idUser, setIsLogin, infoUser, } = useContext(AppContext);
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [studentCode, setStudentCode] = useState('')

  const [deviceName, setDeviceName] = useState('');
  const [osVersion, setOsVersion] = useState('');


  useEffect(() => {
    getUserInfo()
    getDeviceName();
    getOsVersion();
    return () => {

    }
  }, [])

  const getDeviceName = async () => {
    const name = await DeviceInfo.getDeviceName();
    setDeviceName(name);
  };

  // Lấy phiên bản hệ điều hành
  const getOsVersion = async () => {
    const version = await DeviceInfo.getSystemVersion();
    console.log("version", version);

    setOsVersion(version);
  };

  const getUserInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        // Sử dụng thông tin đã lưu ở đây
        setAvatar(userInfo.avatar)
        setStudentCode(userInfo.studentCode)
        setName(userInfo.name)
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <SafeAreaView style={[AppStyle.header, AppStyle.row, { paddingTop: 20, paddingHorizontal: 16, justifyContent: 'space-between', }]}
    >
      <View style={[AppStyle.row, {}]}
      >
        {infoUser.avatar != "" ?
          (
            <FastImage
              style={AppStyle.avatar}
              source={{
                uri: avatar,
                priority: FastImage.priority.normal,
              }}
            // resizeMode={FastImage.resizeMode.contain}
            />
          )
          :
          (
            <FastImage
              style={AppStyle.avatar}
              source={require('../assets/images/defaultAvatar.png')}
            />
          )
        }
        <View style={[AppStyle.column, { marginLeft: 12, justifyContent: 'space-between', paddingVertical: 4 }]}>
          <Text style={[AppStyle.titleSmall, { color: COLOR.title }]}>{name}</Text>
          <Text style={[AppStyle.titleSmall, { paddingTop: 4 }]}>{studentCode}</Text>
        </View>
      </View>
      <FastImage
        style={{ width: 88, height: 27, marginTop: 10, paddingRight: 16 }}
        source={require('../assets/images/logo.jpg')}
      />
    </SafeAreaView>
  )
}

export default AppHeader

const styles = StyleSheet.create({})