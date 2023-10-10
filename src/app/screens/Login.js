import { SafeAreaView, StyleSheet, Image, TouchableOpacity, StatusBar, Text, View, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../constants/AppContext'

const Login = () => {
  const navigation = useNavigation()
  const { setIsLogin } = useContext(AppContext)
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
    password: Yup.string().required('Password không được để trống'),
  });
  return (
    <SafeAreaView style={appStyle.container}>
      <Text style={[appStyle.title, { alignSelf: 'center', marginTop: 20, fontFamily: 'Galada-Regular', fontSize: 20 }]}>Sign In</Text>
      <Image style={[appStyle.logo, { alignSelf: 'center', marginTop: 26 }]} source={require('../assets/images/logo_fpt.png')} />
      <View style={appStyle.boxLogin}>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setIsLogin(true)
            console.log(values);
          }}

        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View style={[appStyle.boxInput, { marginTop: touched.password && errors.password ? 12 : 24 }, touched.email && errors.email && { borderColor: COLOR.primary }]}>
                <TextInput placeholder='Email address'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email} />
              </View>
              {touched.email && errors.email && <Text style={appStyle.textError}>{errors.email}</Text>}

              <View style={[appStyle.boxInput, { marginTop: touched.password && errors.password ? 12 : 24 }, touched.password && errors.password && { borderColor: COLOR.primary }]}>
                <TextInput placeholder='Password' secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password} />
              </View>
              {touched.password && errors.password && <Text style={appStyle.textError}>{errors.password}</Text>}
              <TouchableOpacity>
                <Text style={[appStyle.text, { fontWeight: '500', alignSelf: 'center', marginTop: 20 }]}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[appStyle.button, { marginTop: 36 }]} onPress={handleSubmit}>
                <Text style={appStyle.titleButton}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <Text style={[appStyle.text, { fontWeight: '600', alignSelf: 'center', marginTop: 20 }]}>OR</Text>
        <View style={[appStyle.row, { justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }]}>
          <TouchableOpacity>
            <Image style={appStyle.ic_social} source={require('../assets/icons/ic_twitter.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={[appStyle.ic_social, { width: 56, height: 56 }]} source={require('../assets/icons/ic_fb.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={appStyle.ic_social} source={require('../assets/icons/ic_instagram.png')} />
          </TouchableOpacity>
        </View>

        <View style={[appStyle.row, { marginTop: 36, alignSelf: 'center' }]}>
          <Text style={[appStyle.text, { fontWeight: '500', }]}>Don't have an account?</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
            <Text style={[appStyle.text, { fontWeight: '500', marginLeft: 8, color: COLOR.primary }]}>Sign up</Text>

          </TouchableOpacity>
        </View>

      </View>
      <StatusBar backgroundColor={COLOR.background} barStyle="dark-content" />

    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({

})