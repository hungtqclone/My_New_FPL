import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'
import { useNavigation } from '@react-navigation/native'

const Begin = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={[appStyle.container, { alignItems: 'center', }]}>
      <Image style={[appStyle.logo, { alignSelf: 'center', marginTop: '50%' }]} source={require('../assets/images/logo_fpt.png')} />
      <View style={{ marginTop: '10%', width: '85%', }}>
        <TouchableOpacity style={appStyle.button} onPress={() => { navigation.navigate("Login") }}>
          <Text style={appStyle.titleButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[appStyle.button, { marginTop: 20, backgroundColor: COLOR.background, borderWidth: 1.5, borderColor: COLOR.primary }]}
          onPress={() => { navigation.navigate("Register") }}>
          <Text style={[appStyle.titleButton, { color: COLOR.primary }]}>Register</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={COLOR.background} barStyle="dark-content" />
    </SafeAreaView>
  )
}

export default Begin

const styles = StyleSheet.create({})