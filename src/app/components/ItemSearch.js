import {  StyleSheet, Image,Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../theme/color'
import { appStyle } from '../theme/appStyle'

const ItemSearch = () => {
  return (
    <TouchableOpacity style={styles.boxItem}>
        <Image  style={[appStyle.icon,{tintColor:COLOR.normalText}]} source={require('../assets/icons/ic_cart.png')}/>
      <Text style={[appStyle.text,{fontSize:12,paddingLeft:6}]}>Name </Text>
    </TouchableOpacity>
  )
}

export default ItemSearch

const styles = StyleSheet.create({
    boxItem:{
        backgroundColor:COLOR.background,
        borderRadius:8,
        padding:6,
        flexDirection:'row',
        alignItems:'center',
        marginRight:6,
    }
})