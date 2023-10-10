import {  StyleSheet, Text, Linking, View, Image, Clipboard, TouchableOpacity } from 'react-native'
import React ,{ useState }from 'react'
import { AppStyle } from "../../constants/AppStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR } from "../../constants/Theme";
import ItemButton from "../../components/ItemButton";
import AppHeader from "../../components/AppHeader";
import { ScrollView } from "moti";
import { useNavigation } from '@react-navigation/native';
import numeral from 'numeral';
import Toast from 'react-native-toast-message';
import call from 'react-native-phone-call';


const DetailFindGoWith = (props) => {
  const navigation = useNavigation();
  const { data } = props.route.params;
  // console.log(data.phoneUser);
  const { nameUser, phoneUser, dateStart, endPoint,
    price, startPoint, status, studentCode, timeStart,
    note, image } = data;



    //CALL PHONE
    const handleCall = () => {
      const phoneNumber = phoneUser;
      const args = {
        number: phoneNumber,
        prompt: true,
      };
      call(args).catch(console.error);
    };


  // COPY PHONE NUMBER
  const handleCopy = () => {
    const content = phoneUser; // Nội dung cần sao chép
    Clipboard.setString(content);
    Toast.show({
      ToastPosition: 'top',
      type: 'success',
      text1: "Copy ✅"
    });
  };

  // SHOW HIDE PHONE NUMBER
  const [hidden, setHidden] = useState(true);
  const toggleHidden = () => {
    setHidden(!hidden);
  };

  const getDisplayedText = () => {
    if (hidden) {
      return phoneUser.substring(0, phoneUser.length - 5) + '*****';
    } else {
      return phoneUser;
    }
  };
  return (
    <SafeAreaView style={AppStyle.container}>
    <AppHeader />
    <ScrollView style={[AppStyle.main, { paddingHorizontal: 6 }]} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View style={AppStyle.rowBtw}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Image style={{ width: 20, height: 20, tintColor: '#4D4C4C' }} source={require('../../assets/icons/ic_left.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Tìm yên sau</Text>
        <Text>   </Text>
      </View>

      <ScrollView style={styles.boxDetail} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[AppStyle.row, { width: '50%', alignItems: 'center' }]}>
            <Image style={styles.iconBig} source={require('../../assets/icons/ic_location.png')} />
            <Text style={[AppStyle.text16, { fontWeight: '600',  }]} numberOfLines={1}>{startPoint}</Text>
          </View>
          <View style={[AppStyle.row, { width: '50%', alignItems: 'center' }]}>
            <Image style={styles.iconBig} source={require('../../assets/icons/ic_destination.png')} />
            <Text style={[AppStyle.text16, { fontWeight: '600',  }]} numberOfLines={1}>{endPoint}</Text >
          </View>
        </View>

        <View style={styles.boxContent}>
          {/* NAME AND STUDENT ID */}
          <View style={[AppStyle.rowBtw, { marginBottom: 14 }]}>
            <View style={[AppStyle.row, { width: '50%', alignItems: 'center' }]}>
              <Image style={styles.icon} source={require('../../assets/icons/ic_user_focus.png')} />
              <Text style={[AppStyle.text14, { fontWeight: '600', marginLeft: 6, color: '#4D4C4C' }]} numberOfLines={1}>{nameUser}</Text >
            </View>

            <View style={[AppStyle.row, { width: '50%', alignItems: 'center' }]}>
              <Image style={styles.icon} source={require('../../assets/icons/ic_id_verify.png')} />
              <Text style={[AppStyle.text14, { fontWeight: '500', marginLeft: 6, color: '#4D4C4C' }]} numberOfLines={1}>{studentCode}</Text >
            </View>
          </View>

          {/* DATE AND PHONE NUMBER */}
          <View style={[AppStyle.rowBtw, { marginBottom: 14 }]}>
            <View style={[AppStyle.row, { width: '50%', alignItems: 'center' }]}>
              <Image style={styles.icon} source={require('../../assets/icons/ic_calendar.png')} />
              <View style={[AppStyle.row, { marginLeft: 2 }]}>
                <Text style={[AppStyle.text14, { marginLeft: 4, color: '#4D4C4C' }]} numberOfLines={1}>Ngày: </Text >
                <Text style={[AppStyle.text14, { fontWeight: '600', color: COLOR.blue }]} numberOfLines={1}>{dateStart.slice(0, 10)}</Text >
              </View>
            </View>

            <View style={[AppStyle.rowBtw, { width: '50%', alignItems: 'center', }]}>
              <View style={AppStyle.row}>
                <Image style={styles.icon} source={require('../../assets/icons/ic_phone.png')} />
                <Text style={[AppStyle.text14, { marginLeft: 4, color: '#0075FF' }]} numberOfLines={1}>{getDisplayedText()}</Text >
              </View>

              <View style={AppStyle.row}>
                <TouchableOpacity onPress={toggleHidden}>
                  {
                    hidden ? (<Image style={[styles.icon,]} source={require('../../assets/icons/ic_invisible.png')} />)
                      : (<Image style={[styles.icon,]} source={require('../../assets/icons/ic_visible.png')} />)
                  }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { handleCopy() }}>
                  <Image style={[styles.icon, { marginLeft: 8 }]} source={require('../../assets/icons/ic_copy.png')} />
                </TouchableOpacity>
              </View>

            </View>
          </View>

          {/* TIME AND PRICE */}
          <View style={[AppStyle.rowBtw, { marginBottom: 14 }]}>
            <View style={[AppStyle.row, { width: '50%', alignItems: 'center' }]}>
              <Image style={[styles.icon, { width: 20, height: 20, left: -2, }]} source={require('../../assets/icons/ic_time.png')} />
              <View style={[AppStyle.row, { marginLeft: 2 }]}>
                <Text style={[AppStyle.text14, { color: '#4D4C4C' }]} numberOfLines={1}>Thời gian: </Text >
                <Text style={[AppStyle.text14, { fontWeight: '600', color: COLOR.blue }]} numberOfLines={1}>{timeStart}</Text >
              </View>
            </View>

            <View style={[AppStyle.row, { width: '50%', alignItems: 'center' }]}>
              <Image style={[styles.icon, { tintColor: '#0C9B34' }]} source={require('../../assets/icons/ic_vietnam_dong.png')} />
              <Text style={[AppStyle.text14, { fontWeight: '500', marginLeft: 4, color: '#0C9B34', letterSpacing: 0.8 }]} numberOfLines={1}>
                {numeral(price).format('0,0')} ₫</Text >
            </View>
          </View>

          {/* IMAGE */}
          <View>
            <View style={[AppStyle.row, { width: '50%', alignItems: 'center' }]}>
              <Image style={[styles.icon, {}]} source={require('../../assets/icons/ic_road_map.png')} />
              <Text style={[AppStyle.text14, { marginLeft: 6, color: '#4D4C4C' }]} numberOfLines={1}
              >Quãng đường</Text >
            </View>
            <Image style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }} source={require('../../assets/images/default_map.png')} />
          </View>

          {/* NOTE */}
          <View style={{ marginTop: 18, marginBottom: 24 }}>
            <View style={[AppStyle.row, { width: '50%', alignItems: 'center' }]}>
              <Image style={[styles.icon, {}]} source={require('../../assets/icons/ic_note.png')} />
              <Text style={[AppStyle.text14, { marginLeft: 6, color: '#4D4C4C' }]} numberOfLines={1}
              >Ghi chú</Text >
            </View>
            <View style={styles.boxNote}>
              <Text style={[AppStyle.text12, { color: '#4D4C4C' }]}>{note}</Text>
            </View>
          </View>

          <View style={AppStyle.rowBtw}>
            <ItemButton width={"45%"} title={"Nhắn tin"} paddingVertical={10} />
            <ItemButton width={"45%"} title={"Gọi điện"} paddingVertical={10} backgroundColor={COLOR.background} textColor={COLOR.primary}
              onPress={() => { handleCall() }} />
          </View>
        </View>
      </ScrollView>
    </ScrollView >
  </SafeAreaView >
  )
}

export default DetailFindGoWith

const styles = StyleSheet.create({
  boxDetail: {
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: COLOR.background,
    marginBottom: 200,
    margin: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  header: {
    backgroundColor: "#E8FFCE",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxContent: {
    backgroundColor: COLOR.background,
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,


  },
  lineContent: {

  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#4D4C4C',

  },
  iconBig: {
    width: 18,
    height: 18,
    tintColor: '#4D4C4C',
    marginRight: 4

  },
  boxNote: {
    borderWidth: 0.5,
    borderColor: '#949494',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 24,
    borderRadius: 6,
    marginTop: 4,

  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF640D',


  }
});