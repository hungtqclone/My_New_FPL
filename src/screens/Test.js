import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { GoogleOneTapSignIn, statusCodes } from 'react-native-google-one-tap-signin';
const Test = () => {
  signIn = async () => {
    try {
      await GoogleOneTapSignIn.hasPlayServices();
      const userInfo = await GoogleOneTapSignIn.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <TouchableOpacity>
      <Text>Test</Text>
    </TouchableOpacity>
  )
}

export default Test

const styles = StyleSheet.create({})