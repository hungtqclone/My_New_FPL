import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../theme/color'
import { appStyle } from '../theme/appStyle'

const ItemSaveDish = () => {
  return (
    <TouchableOpacity style={styles.boxItemSave}>
      <Image style={styles.imageDish} source={require('../assets/images/food1.jpg')} />
      <View style={styles.bõContent}>
        <Text style={[appStyle.text,{fontSize:12}]}>100.000</Text>
        <Text style={[appStyle.text, { paddingVertical: 4, fontWeight: '500',textAlign:'center',}]} numberOfLines={2}>Name dish Name dish Name dish  </Text>

      </View>
    </TouchableOpacity>
  )
}

export default ItemSaveDish

const styles = StyleSheet.create({
  boxItemSave: {
    backgroundColor: COLOR.background,
    borderRadius: 10,
    width: '45%',
    marginBottom: 16,
    marginRight:28,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4

  },
  imageDish: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bõContent: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    height: 84,
  }
})