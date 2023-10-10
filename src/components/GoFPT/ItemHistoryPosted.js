import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import numeral from 'numeral';
import ItemButton from "../ItemButton";
import { useNavigation } from '@react-navigation/native';

const ItemHistoryPosted = (props) => {
  const { data } = props;
  const { typeFind, idUser, nameUser, phoneUser, dateStart, endPoint, price, startPoint, status, studentCode, timeStart, } = data;
  const navigation = useNavigation();
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
    <View style={styles.boxItem}>
      <View style={styles.left} />
      <View style={styles.boxContent}>
        <View style={styles.boxLocation}>
          <View style={[AppStyle.row, { alignItems: 'center', width: '48%' }]}>
            <Image style={styles.iconLocation} source={require('../../assets/icons/ic_location.png')} />
            <Text style={[AppStyle.text14, { fontWeight: '600', marginLeft: 4 }]}>{startPoint}</Text>
          </View>

          <View style={[AppStyle.row, { alignItems: 'center', width: '48%' }]}>
            <Image style={styles.iconLocation} source={require('../../assets/icons/ic_destination.png')} />
            <Text style={[AppStyle.text14, { fontWeight: '600', marginLeft: 4 }]}>{endPoint}</Text>
          </View>
        </View>

        <View style={styles.boxInfo}>
          <View style={styles.boxItemInfo}>
            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_calendar.png')} />
              <Text style={[AppStyle.text12, { fontWeight: '500', marginLeft: 6 }]}>{dateStart.slice(0,10)}</Text>
            </View>

            <View style={[AppStyle.rowCenter, { width: '50%', justifyContent: 'space-between' }]}>
              <View style={AppStyle.rowCenter}>
                <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_phone.png')} />
                <Text style={[AppStyle.text12, { fontWeight: '500', marginLeft: 6, letterSpacing: .8, color: COLOR.textPhone, }]}
                >{getDisplayedText()}</Text>
              </View>

              <TouchableOpacity onPress={toggleHidden}>
                {
                  hidden ? (<Image style={AppStyle.iconSmall} source={require('../../assets/icons/ic_invisible.png')} />)
                    : (<Image style={AppStyle.iconSmall} source={require('../../assets/icons/ic_visible.png')} />)
                }
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxItemInfo}>
            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_time.png')} />
              <Text style={[AppStyle.text12, { fontWeight: '500', marginLeft: 6 }]}>{timeStart}</Text>
            </View>

            <TouchableOpacity style={[AppStyle.rowCenter, { width: '50%' }]}>
              <Image style={AppStyle.iconMedium} source={require('../../assets/icons/ic_chat.png')} />
              <Text style={[AppStyle.text12, { fontWeight: '500', marginLeft: 6, }]}
              >Nhắn tin</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.boxItemInfo, { marginBottom: 0 }]}>
            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <Image style={[AppStyle.iconMedium, { tintColor: COLOR.textMoney }]} source={require('../../assets/icons/ic_vietnam_dong.png')} />
              <Text style={[AppStyle.text12, {letterSpacing:0.8, fontWeight: '700', marginLeft: 6, fontStyle: 'italic', color: COLOR.textMoney }]}>{numeral(price).format('0,0')} ₫</Text>
            </View>

            <View style={[AppStyle.rowCenter, { width: '50%' }]}>
              <ItemButton title={"Xem chi tiết"} paddingVertical={6}
               onPress={() => { { navigation.navigate('DetailFindDriver', { data: data }) } }} />
            </View>

          </View>
        </View>
      </View>
    </View>


  );
};

export default ItemHistoryPosted;

const styles = StyleSheet.create({
  boxItem: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#B5B5B5',
    marginBottom: 12,
    


  },
  boxContent: {
    width: '97%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderRadius: 8,

  },
  boxLocation: {
    backgroundColor: COLOR.headItem,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',

    paddingVertical: 10,


  },
  boxInfo: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor:COLOR.background,
    borderBottomRightRadius: 8,

  },
  boxItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    

    marginBottom: 14,
  },
  left: {
    backgroundColor: COLOR.left3,
    width: "3%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,

  },
  iconLocation: {
    width: 20,
    height: 20,

  }
});
