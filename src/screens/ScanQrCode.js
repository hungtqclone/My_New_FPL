import {
  View, Text, StyleSheet, Modal, ToastAndroid, Image, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { AppStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
import AxiosInstance from '../constants/AxiosInstance';
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image';

const ScanQrCode = () => {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const navigation = useNavigation()
  const [infoStudent, setInfoStudent] = useState([])
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const [nameUser, setNameUser] = useState('')
  const [studentCode, setStudentCode] = useState('')
  const [major, setMajor] = useState('')
  const [avatar, setAvatar] = useState(null)


  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  }
  const Overlay = () => (
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={() => setOverlayVisible(false)}
    />
  );

  const Panel = () => (
    <View style={{ width: "90%" }}>
      <View style={styles.header}>
        <Text style={[AppStyle.titleBig, { color: COLOR.white, alignItems: 'center' }]}>Thông tin sinh viên</Text>
      </View>
      <View style={styles.panel}>
        <View style={{}}>
          <View style={[AppStyle.row, {}]}>
            {infoStudent.avatar ?
              (<FastImage style={AppStyle.portrait} source={require('../assets/images/green_field.jpg')} />)
              :
              (<FastImage style={AppStyle.portrait} source={{ uri: avatar, priority: FastImage.priority.normal, }} />)
            }
            <View style={[AppStyle.column, { marginLeft: 8, width: '50%' }]}>
              <View style={{ marginBottom: 12 }} >
                <Text style={AppStyle.textNormal}>Họ và tên/Name</Text>
                <Text style={AppStyle.titleBig}>{nameUser}</Text>
              </View>
              <View style={{ marginBottom: 12, width: '100%', }} >
                <Text style={AppStyle.textNormal}>MSSV/Student ID</Text>
                <Text style={[AppStyle.titleMedium, { width: '100%', color: COLOR.title, letterSpacing: 1, textAlign: 'left' }]} numberOfLines={1}>{studentCode}</Text>
              </View>
              <View >
                <Text style={AppStyle.textNormal}>Chuyên ngành/Major</Text>
                <Text style={[AppStyle.titleMedium, { width: 160, color: COLOR.title }]} numberOfLines={2}>{major}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.textLink} >----------------------- caodang.fpt.edu.vn -----------------------</Text>

        </View>

        <TouchableOpacity onPress={() => setOverlayVisible(false)} style={AppStyle.buttonBlue}>
          <Text style={AppStyle.titleButton}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
  const handleReadQRCode = async ({ data }) => {
    try {
      const studentCode = data.slice(7, 14)
      // const studentCode ='PS24943'
      console.log("studentCode", studentCode, data);

      const response = await AxiosInstance().get("user/api/get-by-studentCode?studentCode=" + studentCode);
      console.log("===============================================>", response);
      console.log("=============================r==================>", response.user.name);

      if (response.result) {
        setInfoStudent(response)
        setNameUser(response.user.name)
        setStudentCode(response.user.studentCode)
        setMajor(response.user.major)
        setAvatar(response.user.avatar)
        console.log(response.user.avatar, "===============================================>", response.user.studentCode,);

        setOverlayVisible(true)
      } else {
        ToastAndroid.show("Mã code không khả dụng", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal visible={isOverlayVisible} transparent>
        <View style={styles.container}>
          <Overlay />
          <Panel />
        </View>
      </Modal>
      <QRCodeScanner
        onRead={(data) => handleReadQRCode(data)}
        flashMode={isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        reactivateTimeout={500}
        showMarker={true}
        topContent={
          <View style={{ alignSelf: 'flex-start', width: '100%', height: '100%', backgroundColor: COLOR.background, borderColor: 'white', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
            <View style={[AppStyle.row, { justifyContent: 'space-between', width: '100%', paddingHorizontal: 8, paddingVertical: 8 }]}>
              <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} style={AppStyle.row}>
                <Image style={[AppStyle.icon, { tintColor: COLOR.primary }]} source={require('../assets/icons/ic_left.png')} />
                <Text style={AppStyle.titleMedium}>Quay lại</Text>
              </TouchableOpacity>
              <Image style={[AppStyle.logo, {}]} source={require('../assets/images/logoFPL.png')} />
            </View>
            <Text style={[AppStyle.titleBig, { fontSize: 20, paddingVertical: 16, alignSelf: 'center', }]}>Kiểm tra thông tin sinh viên</Text>
          </View>
        }
        bottomContent={
          <View style={{ alignSelf: 'flex-start', width: '100%', height: '100%', borderWidth: 2, borderColor: 'white', backgroundColor: COLOR.background, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <TouchableOpacity style={styles.buttonTouchable} onPress={toggleFlash}>
              <Image style={[AppStyle.icon, { tintColor: COLOR.light }]} source={require('../assets/icons/ic_flash_light.png')} />
              {
                isFlashOn ? (<Text style={styles.buttonText}>Tắt đèn</Text>) : (<Text style={styles.buttonText}>Mở đèn</Text>)
              }
            </TouchableOpacity>
          </View>
        }
      />
    </>
  )
}

export default ScanQrCode

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 21,
    color: COLOR.textLight
  },
  buttonTouchable: {
    backgroundColor: COLOR.background2,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    marginTop: 16,
  },
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
    padding: 14,
    width: '100%',
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
});
