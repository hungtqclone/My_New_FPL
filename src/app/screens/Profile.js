import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Success from '../components/Success'
import { appStyle } from '../theme/appStyle'
import ItemButton from '../components/ItemButton'

const Profile = () => {
  return (
    <View style={appStyle.container}>
      <Success/>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})