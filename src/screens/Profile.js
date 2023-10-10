import { SafeAreaView, Dimensions, StyleSheet, Text, View, Image, Modal, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { AppStyle } from '../constants/AppStyle'
import { COLOR } from '../constants/Theme'
import ItemProfile from '../components/Profile/ItemProfile'
import { Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from "../utils/AppContext";
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { MotiView, MotiText } from 'moti'
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');


const Profile = (props) => {
  const navigation = useNavigation();
  const { infoUser, idUser, showWebView, setShowWebView } = useContext(AppContext);
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [studentCode, setStudentCode] = useState('')
  const [email, setEmail] = useState('')

  const getInfoUser = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        // Sử dụng thông tin đã lưu ở đây
        setAvatar(userInfo.avatar)
        setStudentCode(userInfo.studentCode)
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sendEmail = (email) => {
    const subject = 'Tiêu đề email';
    const body = 'Nội dung email';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url);
  };

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleDirection = () => {
    if (origin && destination) {
      setDirections({
        origin: origin.description,
        destination: destination.description,
      });
    }
  };

  const [position, setPosition] = useState({
    latitude: 10.853864,
    longitude: 106.627351,
    latitudeDelta: 0.001,
    longitudeDelta: 0.01,
  });
  const [position2, setPosition2] = useState({
    latitude: 10.8529642,
    longitude: 106.6282855,
    latitudeDelta: 0.1,
    longitudeDelta: 0.01,
  });
  const [position3, setPosition3] = useState({
    latitude: 10.8529096,
    longitude: 106.6291175,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    getInfoUser();
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const Overlay = () => (
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={() => setOverlayVisible(false)}
    />
  );

  const Panel = () => (
    <View style={styles.panel}>
      <Text style={AppStyle.titleMedium}>Chọn phòng ban</Text>
      <View style={{ marginTop: 10 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.button1} onPress={() => sendEmail('qhdn.fplhcm@fe.edu.vn')}>
            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>Phòng quan hệ doanh nghiệp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button1, { backgroundColor: '#FFD1DA', borderColor: '#FFD1DA' }]}
            onPress={() => sendEmail('daotaofpoly.hcm@fe.edu.vn')}>
            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>Phòng đào tạo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button1, { backgroundColor: '#FFF7D4', borderColor: '#FEFF86' }]} onPress={() => sendEmail('dvsvpoly.hcm@poly.edu.vn')}>
            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>Phòng dịch vụ sinh viên</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => setOverlayVisible(false)} style={AppStyle.buttonBlue}>
        <Text style={AppStyle.titleButton}>Đóng</Text>
      </TouchableOpacity>
    </View>
  );
  const goVideoCall = () => {
    navigation.navigate("VideoCall");
  }
  const goChat = () => {
    // navigation.navigate("ChatTest");
    // navigation.navigate("ChatAI");
    setShowWebView(1)

  }
  const goScanner = () => {
    navigation.navigate("ScanQRCode");
  }
  const goWebsite = () => {
    // navigation.navigate("WebsiteFPL");
    // navigation.replace("WebsiteFPL")
    setShowWebView(0)
  }
  return (
    <SafeAreaView style={[AppStyle.container]}>
      <MotiView style={[AppStyle.column, AppStyle.boxShadow, { paddingHorizontal: 16, paddingVertical: 12, borderBottomStartRadius: 20, borderBottomEndRadius: 20, width: '102%', elevation: 4, top: '-1%', left: -4 }]}
        from={{ translateY: -height }}
        animate={{ translateY: 0 }}
        transition={{
          type: 'timing',
          duration: 1000,
        }}>
        <View style={[AppStyle.row, {}]}>
          <Text style={[AppStyle.titleBig, { color: COLOR.primary, flex: 1 }]}>Hồ sơ cá nhân</Text>
          <TouchableOpacity >
            <Image style={{ width: 100, height: 30 }} source={require('../assets/images/logo.jpg')} />
          </TouchableOpacity>
        </View>

        <ItemProfile />

        <View style={[AppStyle.row, { width: '100%', justifyContent: 'space-between' }]}>
          <View style={{ marginLeft: 10, marginBottom: 8 }}>
            <Text style={[AppStyle.titleSmall, { color: COLOR.black, fontWeight: '500' }]}>Giới tính: <Text style={{ color: COLOR.normalText, fontWeight: '400' }}>Nam</Text></Text>
          </View>
          <TouchableOpacity onPress={() => { goScanner() }}>
            <Image style={{ width: 24, height: 24, marginRight: 8 }} source={require('../assets/icons/ic_scan_qr_code.png')} />
          </TouchableOpacity>
        </View>

        <View style={{ marginLeft: 10, marginBottom: 8 }}>
          <Text style={[AppStyle.titleSmall, { color: COLOR.black, fontWeight: '500' }]}>Ngày sinh: <Text style={{ color: COLOR.normalText, fontWeight: '400' }}>08-06-2003</Text></Text>
        </View>
        <View style={{ marginLeft: 10, marginBottom: 8 }}>
          <Text style={[AppStyle.titleSmall, { color: COLOR.black, fontWeight: '500' }]}>Chuyên ngành: <Text style={{ color: COLOR.normalText, fontWeight: '400' }}>Lập trình di động</Text></Text>
        </View>
        <View style={{ marginLeft: 10, marginBottom: 5 }}>
          <Text style={[AppStyle.titleSmall, { color: COLOR.black, fontWeight: '500' }]}>Địa chỉ:  <Text style={{ color: COLOR.normalText, fontWeight: '400', letterSpacing: 0.5, lineHeight: 20, }}>Địa chỉ: 12/23 khu phố 6, Đường abc, Phường XYZ, Quận 12, Tp.HCM</Text></Text>
        </View>
      </MotiView>

      <ScrollView style={{ paddingVertical: 12, paddingHorizontal: 16, marginBottom: '20%', flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', backgroundColor: 'gray', borderWidth: 0.8, height: 170, marginBottom: 10 }}>
          <MapView
            style={styles.map}
            initialRegion={position}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}>
            <Marker
              title='Tòa T'
              // description='This is a description'
              coordinate={position} />
            <Marker
              title='Tòa F'
              // description='This is a description'
              coordinate={position2} />
            <Marker
              title='Tòa P'
              // description='This is a description'
              coordinate={position3} />

          </MapView>
        </View>

        <View>
          <TouchableOpacity style={[AppStyle.button, { marginBottom: 16, marginTop: 8, marginHorizontal: 4, }]}
            onPress={() => { goWebsite() }}>
            <Image style={[AppStyle.icon, {}]} source={require('../assets/images/logo_fpt.png')} />
            <Text style={[AppStyle.titleMedium, { textAlign: 'center', fontWeight: '700', marginLeft: 10, color: COLOR.primary }]}>FPT Polytechnic</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 100 }}>
          <Text style={[AppStyle.titleBig, { marginBottom: 8 }]}>Hỗ trợ</Text>
          <TouchableOpacity style={[AppStyle.button, { marginBottom: 16, marginHorizontal: 4 }]}
            onPress={() => { { goVideoCall() } }}>
            <Image style={[AppStyle.icon, { tintColor: COLOR.primary }]} source={require('../assets/icons/ic_camera.png')} />
            <Text style={[AppStyle.titleMedium, { color: COLOR.black, textAlign: 'center', fontWeight: '500', marginLeft: 10 }]}>Video Call</Text>
          </TouchableOpacity>

          <View style={[AppStyle.row, { justifyContent: 'space-between', marginVertical: 6, marginHorizontal: 4, }]}>
            <TouchableOpacity style={[AppStyle.button, { width: '48%' }]}
              onPress={() => setOverlayVisible(true)}>
              <Image style={AppStyle.icon} source={require('../assets/icons/Google.png')} />
              <Text style={[AppStyle.titleMedium, { color: COLOR.black, textAlign: 'center', fontWeight: '500', marginLeft: 10 }]}>Gửi Gmail hỗ trợ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[AppStyle.button, { width: '48%' }]}
              onPress={() => { { goChat() } }}>
              <Image style={AppStyle.icon} source={require('../assets/icons/ic_message_color.png')} />
              <Text style={[AppStyle.titleMedium, { color: COLOR.black, textAlign: 'center', fontWeight: '500', marginLeft: 10 }]}>AI hỗ trợ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={isOverlayVisible} transparent>
        <View style={styles.container}>
          <Overlay />
          <Panel />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  search: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    flexDirection: 'row',
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
    padding: 15,
    borderRadius: 10,
  },
  button1: {
    backgroundColor: "#8BE8E5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#D5FFE4',
    marginBottom: 12,
    width: 240,
    alignItems: 'center'


  }
})