import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../constants/AppContext'

const ItemDish = () => {
  const navigation = useNavigation()
  const { showBottom, setShowBottom } = useContext(AppContext)

  const goDetail = () => {
    navigation.navigate("Detail");
    setShowBottom(false);

  }
  return (
    <TouchableOpacity style={[styles.boxDish, appStyle.boxShadow]} onPress={() => { goDetail() }}>
      <Image style={appStyle.dishImage} source={require('../assets/images/food1.jpg')} />
      <View style={[styles.boxContent]}>
        <View >
          <Text style={appStyle.titleDish}>Name dish</Text>
          <Text style={[appStyle.titleDish, { fontWeight: '400', fontSize: 14 }]}>Price</Text>
        </View>

        <Text style={[appStyle.titleDish, { color: COLOR.primary }]}>Buy</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemDish

const styles = StyleSheet.create({
  boxDish: {
    backgroundColor: COLOR.background,
    borderRadius: 16,
    marginRight: 16,
    marginVertical: 4,

  },
  boxContent: {
    marginHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,

  }
})