import { StyleSheet, Text, SafeAreaView, View, Image, Animated, Modal, Pressable, TextInput, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { AppStyle } from "../../constants/AppStyle";
import AppHeader from "../../components/AppHeader";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component, useState, useRef, useContext } from "react";
import MapView, { Marker } from 'react-native-maps';

import FastImage from 'react-native-fast-image';
import FindGoWith from "./FindGoWith";
import FindDriver from "./FindDriver";

import HistoryPosted from "./HistoryPosted";
import Icon from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActionButton from 'react-native-action-button';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-input'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import numeral from 'numeral';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ItemButton from "../../components/ItemButton";
import { COLOR } from "../../constants/Theme";
import AxiosInstance from "../../constants/AxiosInstance";
import ToastMessage from "../../components/Toast/ToastMessage";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { appStyle } from "../../app/theme/appStyle";
import { AppContext } from "../../utils/AppContext";


const Tab = createMaterialTopTabNavigator();
const options = ({ route }) => ({
  tabBarLabel: ({ focused, color, size }) => {
    if (route.name === "FindDriver") {
      return (
        <Text
          style={{
            color: focused ? "#F26F25" : "#787878",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Tìm tài xế{" "}
        </Text>
      );
    } else if (route.name === "FindGoWith") {
      return (
        <Text
          style={{
            color: focused ? "#F26F25" : "#787878",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Tìm yên sau
        </Text>
      );
    }

  },
  tabBarIndicatorStyle: {
    backgroundColor: "#F26F25",
    width: "24%",
    height: 4,
    borderRadius: 40,
    left: "13%",
  },
  tabBarStyle: {
    backgroundColor: "white",
  },
});

const GoFPT = () => {
  const navigation = useNavigation();
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isNestedModalVisible, setNestedModalVisible] = useState(false);
  const [isThirdModal, setThirdModal] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const [selectedImageURI, setSelectedImageURI] = useState(null);

  const [imageIndex, setImageIndex] = useState(0);
  const [textColor, setTextColor] = useState('black');

  const [startPoint, setStartPoint] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [price, setPrice] = useState('10000')
  const [note, setNote] = useState('Mình cần tìm bạn đi chung xe')

  const validationSchema = Yup.object().shape({
    location: Yup.string().required('Vui lòng nhập điểm bắt đầu'),
    phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại').matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ'),
    amount: Yup.number().required('Vui lòng nhập số tiền').positive('Số tiền phải là số dương'),
  });

  const [toastType, setToastType] = useState("success");
  const toastRef = useRef(null);
  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };

  const [driverChecked, setDriverChecked] = useState(true);
  const [passengerChecked, setPassengerChecked] = useState(false);

  const checkImage = require('../../assets/icons/ic_check.png');
  const uncheckImage = require('../../assets/icons/ic_uncheck.png');

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
  <ToastMessage
    type={toastType}
    text="Upload ảnh thành công"
    // description="Lorem Ipsum Description"
    ref={toastRef} />
  const handleDriverPress = () => {
    setDriverChecked(true);
    setPassengerChecked(false);
  };

  const handlePassengerPress = () => {
    setDriverChecked(false);
    setPassengerChecked(true);
  };

  const currentTime = new Date();
  let TimeNow = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
  const addNew = async () => {
    try {
      // "typeFind": 1,
      // "idUser": "64ca439dd3b562a9a1e26f98",
      // "nameUser": "Lucas",
      // "phoneUser": "0987654321",
      // "studentCode": "PS24943",
      // "startPoint": "Quan 5",
      // "endPoint": "Toa T",
      // "timeStart": "14h40",
      // "dateStart": "2023-09-19T16:14:52.655Z",
      // "price": 25000,
      // "note": "Minh can tim ban di chung tu quan 5 toi toa T ",
      // "status": 1,


      if (selectedTime.getTime() !== currentTime.getTime()) {
        TimeNow = `${selectedTime.getHours()}:${selectedTime.getMinutes()}`;
      } else {
        TimeNow = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
      }

      const typeFind = driverChecked ? 1 : 2;
      let dateStart = formattedDate == null ? currentDay : formattedDate;

      // console.log(selectedImageURI);
      // console.log(dateStart, currentDay);
      // console.log(idUser, selectedTime);

      const response = await AxiosInstance().post("gofpt/api/add-new", {
        startPoint: startPoint,
        typeFind: typeFind,
        nameUser: infoUser.name,
        idUser: idUser,
        phoneUser: phoneNumber,
        studentCode: infoUser.studentCode,
        endPoint: "Toa T",
        timeStart: TimeNow,
        dateStart: dateStart,
        price: price,
        note: note,
        status: 1,
        image: selectedImageURI
      });
      console.log("===================================response", response);

      if (response.result) {
        console.log("ADD SUCCESS");
        ToastAndroid.showWithGravity(
          'Đăng thành công',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setStartPoint('')
        setPhoneNumber('')
      } else {
        console.log("ADD FAILED");

        ToastAndroid.showWithGravity(
          'Đăng thất bại',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }


    } catch (error) {
      console.log(error);
    }
  }

  const toggleThirdModal = () => {
    setThirdModal(!isThirdModal);
  };

  const toggleNestedModal = () => {
    setNestedModalVisible(!isNestedModalVisible);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.log(date);
    setFormattedDate(moment(date, 'YYYY/MM/DD').format('YYYY/MM/DD'));
    hideDatePicker();
  };

  // ==================| TIME PICKER |========================
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    // console.log('data',date);
    setSelectedTime(date);
    hideTimePicker();

  };



  const dialogImageChoose = () => {
    return Alert.alert(
      "Thông báo",
      "Mời bạn chọn ảnh",
      [
        {
          text: "Tải ảnh lên",
          onPress: () => {
            getImageLibrary()
          }
        },
        {
          text: "Hủy",
        }])
  }

  const getImageLibrary = async () => {
    const result = await launchImageLibrary();
    if (result.assets.length > 0) {
      const imageURI = result.assets[0].uri;

      // console.log(result.assets[0].uri);
      const formdata = new FormData();
      formdata.append('image', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      const response = await AxiosInstance("multipart/form-data").post('/gofpt/api/upload-image', formdata);
      // console.log(response.link);
      if (response.result == true) {
        setSelectedImageURI(imageURI);
        setToastType("success"); handleShowToast();
      }
      else {
        ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
      }
    }
  }

  return (
    <SafeAreaView style={AppStyle.container}>
      {/* <PhoneInput ref='phone'/> */}
      <AppHeader style={{ height: "45%", }} />
      <Tab.Navigator screenOptions={options} style={{}}>
        <Tab.Screen name="FindDriver" component={FindDriver} />
        <Tab.Screen name="FindGoWith" component={FindGoWith} />
      </Tab.Navigator>

      <ActionButton buttonColor="#FFC634F5" style={{ bottom: '8%', right: '-5%' }} degrees={-20}
        renderIcon={() => <FastImage style={{ width: 30, height: 30 }} source={require('../../assets/icons/ic_find_user.png')} />}>
        <ActionButton.Item buttonColor='#FFC6AC' title="Tìm bạn cho chuyến đi" onPress={() => toggleModal(true)}>
          <FastImage style={{ width: 16, height: 16 }} source={require('../../assets/icons/ic_plus.png')} />
        </ActionButton.Item>

        <ActionButton.Item buttonColor='#C8E4B2' title="Tin đã đăng" onPress={() => { navigation.navigate("HistoryPosted") }}>
          <FastImage style={{ width: 24, height: 24, tintColor: 'black' }} source={require('../../assets/icons/ic_history.png')} />
        </ActionButton.Item>
      </ActionButton>

      {/* MODAL ADD */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <KeyboardAwareScrollView
          style={{}}
          contentContainerStyle={{}}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          <View style={AppStyle.modalBackground}>
            <View style={[AppStyle.modalView, { width: '90%', }]}>
              <View style={AppStyle.viewheadModal}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}>
                  <FastImage style={{ width: 18, height: 18, alignSelf: 'flex-end', marginRight: 14 }}
                    source={require('../../assets/icons/ic_close.png')}
                  />
                </TouchableOpacity>
                <Text style={AppStyle.txtModal1}>Tìm bạn cho chuyến đi</Text>
              </View>

              {/* CONTENT */}

              <View style={{ paddingHorizontal: 12, paddingTop: 12, paddingBottom: 24 }}>
                <Formik
                  initialValues={{ location: '', phoneNumber: '', amount: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    // Xử lý khi form được gửi đi
                    console.log(values);
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                      {/* LOCATION */}
                      <View style={AppStyle.ddinputModal}>
                        <View style={[AppStyle.boxCenter, { width: '10%' }]}>
                          <FastImage source={require('../../assets/icons/ic_location.png')} style={[AppStyle.icon, {}]} />
                        </View>

                        <TextInput
                          style={AppStyle.inputModal}
                          // onChangeText={[handleChange('location'), (text) => setStartPoint(text)]}
                          onChangeText={(text) => setStartPoint(text)}
                          onBlur={handleBlur('location')}
                          // value={values.location}
                          value={startPoint}
                          returnKeyType="next"
                          placeholder="Điền điểm bắt đầu"
                          placeholderTextColor={'#787878'}
                        />
                        {/* {touched.location && errors.location && <Text>{errors.location}</Text>} */}
                      </View>

                      {/* PHONE NUM */}
                      <View style={AppStyle.ddinputModal}>
                        <View style={[AppStyle.boxCenter, { width: '10%' }]}>
                          <FastImage source={require('../../assets/icons/ic_phone.png')} style={[AppStyle.icon, {}]} />
                        </View>

                        <TextInput
                          style={AppStyle.inputModal}
                          keyboardType="phone-pad"
                          returnKeyType="next"
                          onChangeText={(text) => setPhoneNumber(text)}
                          placeholderTextColor={'#787878'}
                          // onChangeText={[handleChange('phoneNumber'),(text)=>setPhoneNumber(text)]}
                          onBlur={handleBlur('phoneNumber')}
                          // value={values.phoneNumber}
                          placeholder="Số điện thoại"
                        />
                        {/* {touched.phoneNumber && errors.phoneNumber && <Text>{errors.phoneNumber}</Text>} */}

                      </View>

                      {/* DATE  */}
                      <View style={[AppStyle.rowBtw, { height: 40, width: '100%', marginTop: 10 }]}>
                        <TouchableOpacity style={{ height: 40, width: '48%', borderWidth: .5, borderColor: '#DBDBDB', borderRadius: 8, justifyContent: 'space-between', flexDirection: 'row' }}
                          onPress={() => { showDatePicker() }}>
                          <View style={{ backgroundColor: '#FCE38A', height: 40, width: 10, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
                          <Text style={[AppStyle.text14, { alignSelf: 'center', textAlign: 'center' }]}>{formattedDate == null ? currentDay : formattedDate}</Text>
                          <View style={[AppStyle.boxCenter, { marginRight: 10 }]} >
                            <FastImage
                              source={require('../../assets/icons/ic_calendar.png')}
                              style={[AppStyle.iconMedium, {}]}
                            />
                            <DateTimePickerModal
                              isVisible={isDatePickerVisible}
                              mode="date"
                              onConfirm={() => { handleConfirm() }}
                              onCancel={() => hideDatePicker}
                            />
                          </View>
                        </TouchableOpacity>

                        {/* TIME */}
                        <TouchableOpacity style={{ height: 40, width: '48%', borderWidth: .8, borderColor: '#DBDBDB', borderRadius: 8, justifyContent: 'space-between', flexDirection: 'row' }}
                          onPress={() => { showTimePicker() }} >
                          <View style={{ backgroundColor: '#95E1D3', height: 40, width: 10, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
                          {
                            selectedTime == null ?
                              <Text style={[AppStyle.text14, { alignSelf: 'center', textAlign: 'center' }]}>{TimeNow}</Text>
                              :
                              <Text style={[AppStyle.text14, { alignSelf: 'center', textAlign: 'center' }]}>{selectedTime.getHours()}:{selectedTime.getMinutes()}</Text>
                          }
                          <View style={[AppStyle.boxCenter, { marginRight: 10 }]} >
                            <FastImage
                              source={require('../../assets/icons/ic_clock.png')}
                              style={[AppStyle.iconMedium, {}]}
                            />
                            <DateTimePickerModal
                              isVisible={isTimePickerVisible}
                              mode="time"
                              is24Hour={true}
                              onConfirm={handleTimeConfirm}
                              onCancel={hideTimePicker}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={[AppStyle.rowBtw, { height: 40, width: '100%', marginTop: 10 }]}>
                        {/* PRICE */}
                        <View style={{ height: 40, width: '48%', borderWidth: .5, borderColor: '#DBDBDB', borderRadius: 8, justifyContent: 'space-between', flexDirection: 'row', alignItems: "center", paddingHorizontal: 6 }} >
                          <View style={[AppStyle.boxCenter, {}]}>
                            <FastImage
                              source={require('../../assets/icons/ic_vietnam_dong.png')}
                              style={[AppStyle.icon, {}]}
                            />
                          </View>
                          {/* <Text style={[AppStyle.titleMedium, { color: '#0C9B34', fontStyle: 'italic' }]}>{numeral(10000).format('0,0')} </Text> */}
                          <TextInput
                            keyboardType="number-pad"
                            numberOfLines={1}
                            returnKeyType="go"
                            style={[AppStyle.titleMedium, { fontSize: price == '' ? 12 : 14, color: '#0C9B34', fontWeight: '700', fontStyle: 'italic', textAlign: 'center' }]}
                            value={price}
                            onChangeText={(text) => { setPrice(text) }}
                            // onChangeText={handleChange('amount')}
                            // onBlur={handleBlur('amount')}
                            // value={values.amount}
                            placeholder="Nhập số tiền"
                            placeholderTextColor={'#0C9B34'}
                            multiline={false}
                          />
                          {touched.amount && errors.amount && <Text>{errors.amount}</Text>}
                          <Text style={{ fontSize: 16, color: '#0C9B34', fontWeight: '500' }}>đ</Text>
                        </View>

                        {/* ROLE */}
                        <View style={{ height: 40, width: '48%', borderWidth: .5, borderColor: '#DBDBDB', borderRadius: 8, justifyContent: 'flex-start', flexDirection: 'row', alignItems: "center", }} >
                          <View style={{ width: "20%" }}>
                            <View style={[AppStyle.boxCenter, { backgroundColor: '#EAFFD0', height: 40, borderTopLeftRadius: 6, borderBottomLeftRadius: 8 }]}>
                              <FastImage
                                source={require('../../assets/icons/ic_cross_walk.png')}
                                style={[AppStyle.icon, { width: 20, height: 20 }]}
                              />
                            </View>

                          </View>
                          <View style={{ flexDirection: 'row', width: "78%", }}>
                            <View style={[AppStyle.rowBtw, { width: '100%' }]}>
                              <TouchableOpacity onPress={handleDriverPress}>
                                <View style={AppStyle.rowCenter}>
                                  <FastImage
                                    source={driverChecked ? checkImage : uncheckImage}
                                    style={{ height: 16, width: 16 }}
                                  />
                                  <Text style={[AppStyle.text12, { color: driverChecked ? '#0C9B34' : '#626262' }]}>Tài xế</Text>
                                </View>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={handlePassengerPress}>
                                <View style={AppStyle.rowCenter}>
                                  <FastImage
                                    source={passengerChecked ? checkImage : uncheckImage}
                                    style={{ height: 16, width: 16 }}
                                  />
                                  <Text style={[AppStyle.text12, { color: passengerChecked ? '#0C9B34' : '#626262' }]}>Yên sau</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{ width: '100%', flexDirection: 'row', marginTop: 18, marginBottom: 8, justifyContent: 'space-between' }}>
                        <View style={AppStyle.rowCenter}>
                          <FastImage
                            source={require('../../assets/icons/ic_destination.png')}
                            style={[AppStyle.icon, { width: 16, height: 16 }]}
                          />
                          <Text style={[AppStyle.titleMedium, { color: 'black', marginLeft: 4 }]}>Chọn địa điểm và chụp quãng đường</Text>
                        </View>
                        <TouchableOpacity onPress={toggleNestedModal}>
                          <FastImage
                            source={require('../../assets/icons/ic_question_mark.png')}
                            style={[AppStyle.icon, {}]}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: '100%', backgroundColor: '#DBDBDB', borderRadius: 16, height: 150, marginBottom: 18 }}>
                        <MapView
                          style={[styles.map, { borderRadius: 16 }]}
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
                      <ItemButton title={"Tiếp theo"} paddingVertical={10} onPress={() => { setThirdModal(true) }} />
                    </View>
                  )}
                </Formik>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>

      {/* MODAL ADD TUTORIAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isNestedModalVisible}
        onRequestClose={() => setNestedModalVisible(false)}>
        <View style={AppStyle.modalBackground}>
          <View style={[AppStyle.modalView, {}]}>
            <View style={AppStyle.viewheadModal}>
              <TouchableOpacity
                style={AppStyle.btnX}
                onPress={() => setNestedModalVisible(false)}>
                <FastImage style={{ width: 18, height: 18, }}
                  source={require('../../assets/icons/ic_close.png')}
                />
              </TouchableOpacity>
              <Text style={AppStyle.txtModal1}>Hướng dẫn sử dụng</Text>
            </View>


            <View style={{ paddingVertical: 12, paddingHorizontal: 12, paddingBottom: 24 }}>
              <View style={AppStyle.row}>
                <Text style={[AppStyle.titleMedium, { color: 'black', fontStyle: 'italic', width: '20%', marginBottom: 4, }]}>Bước 1:</Text>
                <Text style={[AppStyle.titleSmall, { marginLeft: 4, color: 'black', fontWeight: 400, width: '80%' }]}>Nhấn vào vị trí bạn muốn đến trong bản đồ</Text>
              </View>
              <FastImage
                source={require('../../assets/images/mapFPT.jpg')}
                style={{ height: 100, width: 168, marginBottom: 14 }}
              />
              <View style={AppStyle.row}>
                <Text style={[AppStyle.titleMedium, { color: 'black', fontStyle: 'italic', width: '20%', marginBottom: 4 }]}>Bước 2:</Text>
                <Text style={[AppStyle.titleSmall, { marginLeft: 4, color: 'black', fontWeight: 400, width: '80%' }]}>Nhấn nút chỉ đường bên phải</Text>
              </View>
              <FastImage
                source={require('../../assets/images/mapFPT2.jpg')}
                style={{ height: 30, width: 80, marginBottom: 14 }}
              />
              <View style={AppStyle.row}>
                <Text style={[AppStyle.titleMedium, { color: 'black', fontStyle: 'italic', width: '20%', marginBottom: 4 }]}>Bước 3:</Text>
                <Text style={[AppStyle.titleSmall, { marginLeft: 4, color: 'black', fontWeight: 400, width: '80%', marginBottom: 16 }]}>Chụp lại màn hình quãng đường đi của bạn ở Google Map để sử dụng cho bước tiếp theo</Text>
              </View>
              <ItemButton title={"Đã hiểu"} paddingVertical={10} onPress={() => setNestedModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL ADD STEP 2 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isThirdModal}
        onRequestClose={() => setThirdModal(false)}>
        <KeyboardAwareScrollView
          style={{}}
          contentContainerStyle={{}}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          <View style={AppStyle.modalBackground}>
            <View style={[AppStyle.modalView, {}]}>
              <View style={[AppStyle.viewheadModal, {}]}>
                <TouchableOpacity
                  style={{ marginHorizontal: 12 }}
                  onPress={() => setThirdModal(false)}>
                  <Image
                    style={{ width: 18, height: 18, alignSelf: 'flex-end', marginLeft: 10 }}
                    source={require('../../assets/icons/ic_close.png')}
                  />
                </TouchableOpacity>
                <Text style={AppStyle.txtModal1}>Tìm bạn cho chuyến đi</Text>
              </View>
              <View>

              </View>

              <View style={{ paddingHorizontal: 10, paddingTop: 12, paddingBottom: 24 }}>

                <View style={AppStyle.rowCenter}>
                  <FastImage
                    style={AppStyle.iconMedium}
                    source={require('../../assets/icons/ic_note.png')}
                  />
                  <Text style={[AppStyle.titleMedium, { color: 'black', fontWeight: 500, marginLeft: 8 }]}>Ghi chú</Text>
                </View>
                <View style={{ borderWidth: .5, color: '#DBDBDB', backgroundColor: COLOR.background, paddingVertical: 4, paddingHorizontal: 4, alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, borderRadius: 8, marginTop: 6, marginBottom: 12 }}>
                  <TextInput
                    placeholder="Nhập mô tả"
                    editable
                    placeholderTextColor={'#787878'}
                    value={note}
                    onChangeText={(text) => { setNote(text) }}
                    multiline
                    style={[{ fontSize: 14, paddingVertical: 0 }]}
                  />
                </View>

                <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 24 }}>
                  <TouchableOpacity
                    onPress={() => { dialogImageChoose() }}
                  >
                    <View style={[AppStyle.viewheadModal, { height: 38, width: 326, backgroundColor: '#FCE38A', borderTopStartRadius: 8, borderTopEndRadius: 8, alignItems: 'center' }]}>
                      <Text style={[AppStyle.titleMedium, { color: 'black' }]}>+ Tải ảnh quãng đường của bạn</Text>
                    </View>
                    <View style={{ height: 200, width: 326, borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}>
                      {selectedImageURI != null ? (
                        <FastImage
                          style={{ height: 200, width: 326, borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}
                          source={{ uri: selectedImageURI }}
                        />
                      ) : (<FastImage
                        style={{ height: 200, width: 326, borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }}
                        source={require('../../assets/images/mapFPT.jpg')}
                      />)}
                    </View>
                  </TouchableOpacity>
                </View>

                <ItemButton title={'Đăng tin'} type="success" text="Success" paddingVertical={10} onPress={() => { setModalVisible(false), setThirdModal(false); setToastType("success"); handleShowToast(); addNew() }} />

              </View>
            </View>

          </View>
        </KeyboardAwareScrollView>
      </Modal>
    </SafeAreaView >

  );
};

export default GoFPT;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
});
