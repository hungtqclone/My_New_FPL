import { SafeAreaView, StyleSheet, Button, Image, TouchableOpacity, StatusBar, Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
const Register = () => {
  const navigation = useNavigation()
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
    name: Yup.string().required('Tên không được để trống'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
      )
      .required('Mật khẩu không được để trống'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Nhập lại mật khẩu không được để trống'),
  });

  return (
    <KeyboardAvoidingView style={appStyle.container}>
      <Text style={[appStyle.title, { alignSelf: 'center', marginTop: 20, fontFamily: 'Galada-Regular', fontSize: 20 }]}>Register</Text>
      <Image style={[appStyle.logo, { alignSelf: 'center', marginTop: 26 }]} source={require('../assets/images/logo_fpt.png')} />
      <Formik
        initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          navigation.navigate("Login")
          Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is a success toast',
            icon: <Icon name="check" size={20} color="green" />,
          });
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={appStyle.boxLogin}>
            <View style={[appStyle.boxInput, touched.name && errors.name && { borderColor: COLOR.primary }]}>
              <TextInput
                placeholder='Username'
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name} />
            </View>
            {touched.name && errors.name && <Text style={appStyle.textError}>{errors.name}</Text>}
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

            <View style={[appStyle.boxInput, { marginTop: touched.password && errors.password ? 12 : 24 }, touched.confirmPassword && errors.confirmPassword && { borderColor: COLOR.primary }]}>
              <TextInput placeholder='Re - Password' secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword} />
            </View>
            {touched.confirmPassword && errors.confirmPassword && <Text style={appStyle.textError}>{errors.confirmPassword}</Text>}

            <View style={[appStyle.row, { marginTop: 36, alignSelf: 'center' }]}>
              <Text style={[appStyle.text, { fontWeight: '500' }]}>Already have an account?</Text>
              <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                <Text style={[appStyle.text, { fontWeight: '500', marginLeft: 8, color: COLOR.primary }]}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[appStyle.button, { marginTop: 36 }]} onPress={handleSubmit}>
              <Text style={appStyle.titleButton}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <StatusBar backgroundColor={COLOR.background} barStyle="dark-content" />
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({

})
