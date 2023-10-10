import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { AppStyle } from '../constants/AppStyle'
import { Dropdown } from 'react-native-element-dropdown'
import ItemScheduleExam from '../components/Schedule/ItemScheduleExam';
import { COLOR } from '../constants/Theme';
import ItemSchedule from '../components/Schedule/ItemScheduleExam';
import AxiosInstance from '../constants/AxiosInstance';
import { AppContext } from '../utils/AppContext'
import Swiper from 'react-native-swiper'
import Loading from '../components/Loading/Loading';

const data = [
  { label: '7 ngày tới', value: '7' },
  { label: '14 ngày tới', value: '14' },
  { label: '30 ngày tới', value: '30' },
  { label: '60 ngày tới', value: '60' },
  { label: '90 ngày tới', value: '90' },
];

const ScheduleExam = () => {
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataCurrentScheduleExam, setDataCurrentScheduleExam] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [availableExam, setAvailableExam] = useState(false)
  const getCurrentSchedule = async () => {
    try {
      console.log(currentDay);
      const response = await AxiosInstance().get("scheduleExam/api/get-by-current-day?currentDay=" + currentDay);
      console.log("===================================response", response);

      if (response.result) {
        if (Array.isArray(response.scheduleExam) && response.scheduleExam.length === 0) {
          setAvailableExam(false)
          console.log("scheduleExam là một mảng rỗng");
        } else {
          console.log("scheduleExam không phải là một mảng rỗng");
          setAvailableExam(true)
          setDataCurrentScheduleExam(response.ScheduleExam);
          console.log("scheduleExa");
          setIsLoading(false)

        }
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // console.log("INFOR ", infoUser);

    getCurrentSchedule()
    return () => {

    }
  }, [appState])

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={AppStyle.container}>
      <Dropdown
        style={[AppStyle.dropdown, isFocus && { borderColor: COLOR.primary, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={data[1].label}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderItem={renderItem}
      />
      <Image style={[AppStyle.icon, { position: 'absolute', left: 30, top: 28, tintColor: isFocus ? COLOR.primary : COLOR.black }]} source={require('../assets/icons/ic_schedule.png')} />
      <View style={styles.BoxContent}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {availableExam ? (<Text style={[AppStyle.titleBig, { marginBottom: 10 }]}>Lịch thi hôm nay</Text>) : (<></>)}
          {availableExam ? (
            <>
              {
                isLoading ?
                  (<Loading />)
                  : (<FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={dataCurrentScheduleExam}
                    renderItem={({ item }) => <ItemScheduleExam data={item} />}
                    keyExtractor={item => item.id}
                  />
                  )}
            </>
          ) : (
            <>
              <Text style={[AppStyle.titleBig, { marginVertical: 16, alignSelf: 'center' }]}>Bạn không có lịch thi hôm nay</Text>
            </>
          )}

          {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' ,width:'100%',}}>
              {DataScheduleToday.slice(0, Math.ceil(DataScheduleToday.length )).map((item) => (
                <ItemSchedule  data={item} key={item.id}/>
              ))}
            </View>  */}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}


export default ScheduleExam

const styles = StyleSheet.create({
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "93%"
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',

  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',

  },

  iconStyle: {
    width: 30,
    height: 30,
  },
  BoxContent: {
    backgroundColor: COLOR.background2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    height: '100%',
    width: '100%',

    paddingHorizontal: 16,
    paddingVertical: 8
  },
});