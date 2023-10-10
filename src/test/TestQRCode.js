import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLOR } from '../constants/Theme';

const MyQRCode = () => {
  const [valueQRCode, setValueQRCode] = useState('PS24943')
  const qrData = 'Hello, world!'; // Dữ liệu bạn muốn mã hóa thành QR

  return (
    <View>
      <TextInput placeholder='type smt'
        value={valueQRCode}
        onChangeText={text => {
          if (valueQRCode == "") {
            setValueQRCode("Hello world")
          }
          setValueQRCode(text)
        }}

      />
      <TouchableOpacity>
        <Text>Generate QR</Text>
      </TouchableOpacity>

      <QRCode value={valueQRCode}
        color={COLOR.title}
        backgroundColor='white'
        // gradientDirection={[0, 0, 0]}
        enableLinearGradient={true}
        linearGradient={[COLOR.Fcolor, COLOR.Pcolor, COLOR.Tcolor]}
        logo={require('../assets/icons/logo_fpt_square.jpg')}
        logoBackgroundColor={'white'}
        logoBorderRadius={16}
        logoMargin={6}
        size={200}
        
      />
    </View>
  );
  //   return(
  //     <Image 
  //     source={require('../assets/gif/loading_bar.gif')}  
  //     style={{width: 300, height: 300 ,alignSelf:'center'}}
  // />
  //   )
};

export default MyQRCode;
