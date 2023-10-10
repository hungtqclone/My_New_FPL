import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { AppStyle } from '../constants/AppStyle'
import { Dropdown } from 'react-native-element-dropdown'
import { COLOR } from '../constants/Theme';
import ItemScheduleStudy from '../components/Schedule/ItemScheduleStudy';
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

const ScheduleStudy = (props) => {
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [dataScheduleByDay, setDataScheduleByDay] = useState([])
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(7);
  const [isLoading, setIsLoading] = useState(true)
  const [availableStudy, setAvailableStudy] = useState(false)

  const getCurrentSchedule = async (value) => {
    try {
      console.log("value", value);
      // const response = await AxiosInstance().get("scheduleStudy/api/get-all");
      const response = await AxiosInstance().get("scheduleStudy/api/get-by-" + value + "-day?currentDay=" + currentDay);

      console.log("===================================response", response.scheduleStudy[1].idSubject);

      if (response.result) {
        if (Array.isArray(response.scheduleStudy) && response.scheduleStudy.length === 0) {
          setAvailableStudy(false)
          console.log("scheduleStudy là một mảng rỗng");
        } else {
          console.log("scheduleStudy không phải là một mảng rỗng");
          setAvailableStudy(true)
          setDataScheduleByDay(response.scheduleStudy);
          setIsLoading(false)
        }

      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  useEffect(() => {
    // console.log("INFOR ", infoUser);
    console.log(value);

    getCurrentSchedule(value)
    return () => {

    }
  }, [value])


  return (
    <SafeAreaView style={AppStyle.container}>
      <Dropdown
        style={[AppStyle.dropdown, isFocus && { borderColor: COLOR.primary, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="7 ngày tới"
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
          {/* <Loading/> */}
          {availableStudy ? (<Text style={[AppStyle.titleBig, { marginBottom: 10 }]}>Lịch học hôm nay</Text>) : (<></>)}
          {availableStudy ? (
            <>
              {isLoading ?
                (<Loading />)
                : (<FlatList
                  vertical
                  style={{marginBottom:200}}
                  showsVerticalScrollIndicator={false}
                  data={dataScheduleByDay}
                  renderItem={({ item }) => <ItemScheduleStudy data={item} />}
                  keyExtractor={item => item.id}
                />)}
            </>
          ) : (
            <>
              <Text style={[AppStyle.titleBig, { marginVertical: 16, alignSelf: 'center' }]}>Bạn không có lịch học hôm nay</Text>
            </>
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}


export default ScheduleStudy

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