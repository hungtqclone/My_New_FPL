import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'

const ItemButton = (props) => {
  const { title, onPress, disable, width } = props;
  return (
    <TouchableOpacity style={[styles.button, { width: width == 1 ? "100%" : width == 0.5 ? "50%" :width == 0.45 ? "45%" : "50%" }]} onPress={onPress} disable={disable}>
      <Text style={appStyle.titleButton}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ItemButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.primary,
    borderRadius: 24,
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',

  }
})