import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AppStyle, windowHeight } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';
// import QRCode from 'react-native-qrcode-svg';
import QRCode from 'react-qr-code';
const ItemProfile = () => {
  const { infoUser, idUser, setIsLogin } = useContext(AppContext);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [studentCode, setStudentCode] = useState(infoUser.studentCode)
  const [email, setEmail] = useState('')
  const Overlay = () => (
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={() => setOverlayVisible(false)}
    />
  );

  const Panel = () => (
    <View style={{}}>
      <View style={styles.header}>
        <Text style={[AppStyle.titleBig, { color: COLOR.white, alignItems: 'center' }]}>Thông tin sinh viên</Text>
      </View>
      <View style={styles.panel}>
        <View style={{}}>
          <View style={[AppStyle.row, {}]}>
            {infoUser.avatar != "" ?
              (<Image style={AppStyle.portrait} source={{ uri: avatar }} />)
              :
              (<Image style={AppStyle.portrait} source={require('../../assets/images/green_field.jpg')} />)
            }
            <View style={[AppStyle.column, { marginLeft: 8 }]}>
              <View style={{ marginBottom: 12 }} >
                <Text style={AppStyle.textNormal}>Họ và tên/Name</Text>
                <Text style={AppStyle.titleBig}>{name}</Text>
              </View>
              <View style={{ marginBottom: 12 }} >
                <Text style={AppStyle.textNormal}>MSSV/Student ID</Text>
                <Text style={[AppStyle.titleMedium, { width: 160, color: COLOR.title, letterSpacing: 1, textAlign: 'left' }]} numberOfLines={1}>{studentCode}</Text>
              </View>
              <View >
                <Text style={AppStyle.textNormal}>Chuyên ngành/Major</Text>
                <Text style={[AppStyle.titleMedium, { width: 160, color: COLOR.title }]} numberOfLines={2}>Lập trình máy tính/Computer Programming</Text>
              </View>
            </View>
          </View>
          <Text style={styles.textLink} >----------------------- caodang.fpt.edu.vn -----------------------</Text>
          <View style={{ alignItems: 'center', marginBottom: 12 }}>
            <QRCode
              value={studentCode}
              color={COLOR.black}
              backgroundColor='white'
              // gradientDirection={[0, 0, 0]}
              // enableLinearGradient={true}
              // linearGradient={[COLOR.Fcolor, COLOR.Pcolor, COLOR.Tcolor]}

              // logo={require('../../assets/icons/logo_fpt_square.jpg')}
              // logoBackgroundColor={'white'}
              // logoBorderRadius={16}
              // logoSize={20}
              // logoMargin={6}
              size={190}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => setOverlayVisible(false)} style={AppStyle.buttonBlue}>
          <Text style={AppStyle.titleButton}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
  const getInfoUser = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        // Sử dụng thông tin đã lưu ở đây
        // console.log('++++++++++>', userInfo.studentCode);
        setAvatar(userInfo.avatar)
        setStudentCode(userInfo.studentCode)
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const LogOut = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      setIsLogin(false)
      console.log('Thông tin người dùng đã được xóa thành công!');
    } catch (error) {
      console.log('Đã xảy ra lỗi khi xóa thông tin người dùng:', error);
    }

  }
  const showInfo = () => {
    setOverlayVisible(true)
  }
  useEffect(() => {
    getInfoUser()

    return () => {
    }
  }, [])

  return (
    <View style={[styles.boxShadow, AppStyle.row, { width: '100%', justifyContent: 'space-between' }]}>
      <View style={[AppStyle.row, { width: '100%', padding: 16, alignItems: 'center', borderRadius: 10 }]}>
        {infoUser.avatar != "" ?
          (<Image style={{ width: 70, height: 70, borderRadius: 100 }} source={{ uri: avatar }} />)
          :
          (<Image style={{ width: 70, height: 70, borderRadius: 100 }} source={require('../../assets/images/green_field.jpg')} />)
        }

        <View style={{ marginLeft: 15 }}>
          <Text style={[AppStyle.titleMedium, { color: COLOR.black, marginBottom: 4 }]}>{name}</Text>
          <Text style={[AppStyle.titleMedium, { marginBottom: 4 }]}>{studentCode}</Text>
          <Text style={[AppStyle.titleSmall, { color: COLOR.normalText, marginBottom: 4 }]}>{email}</Text>
        </View>
      </View>
      <View style={[AppStyle.column, { left: -30, top: 20 }]}>
        <TouchableOpacity onPress={() => { LogOut() }}>
          <Image style={{ width: 27, height: 24, marginBottom: 16, tintColor: COLOR.primary }} source={require('../../assets/icons/ic_logout.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { showInfo() }}>
          <Image style={{ width: 24, height: 24, }} source={require('../../assets/icons/ic_qr_code.png')} />
        </TouchableOpacity>
      </View>
      <Modal visible={isOverlayVisible} transparent>
        <View style={styles.container}>
          <Overlay />
          <Panel />
        </View>
      </Modal>
    </View>
  )
}

export default ItemProfile

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  panel: {
    backgroundColor: 'white',
    padding: 15,
    width: '90%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: COLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  textLink: {
    paddingVertical: 16,
    alignSelf: 'center',
  }

})