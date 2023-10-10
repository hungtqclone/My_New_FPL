import { SafeAreaView, StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color';
import ItemButton from './ItemButton';
import { useNavigation } from '@react-navigation/native';

const Success = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[appStyle.container, { alignItems: 'center', justifyContent: 'center' }]}>
      <Image style={styles.iconSuccess} source={require('../assets/icons/ic_success.png')} />
      <Text style={[appStyle.title, { color: COLOR.Tcolor ,marginBottom:200}]}>Payment success</Text>
      <ItemButton title={"Go Home"} onPress={() => { navigation.navigate("Home") }} />

    </SafeAreaView>
  )
}

export default Success

const styles = StyleSheet.create({
  iconSuccess: {
    height: 150,
    width: 150,
    alignSelf: 'center',

  }
})