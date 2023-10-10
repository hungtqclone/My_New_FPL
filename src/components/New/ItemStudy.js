import { View, Text, TouchableOpacity,Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import { dateNearThe } from '../../screens/Study'
import { MotiView, MotiText } from 'moti'
const { height } = Dimensions.get('window');

import { useNavigation } from '@react-navigation/native'

const ItemStudy = (props) => {
    const navigation = useNavigation();
    const { data } = props
    const [isShow, setIsShow] = useState(false)
    const [showImg, setshowImg] = useState(false)
    const facingShow = () => {
        setIsShow(!isShow)
    }

    const showImage = () => {

    }
    const goDetail = () => { navigation.navigate('DetailsNew') }
    return (
        <MotiView onPress={facingShow} style={[AppStyle.item, { width: "100%", marginVertical: 5 }]}  from={{ translateY: -height }}
        animate={{ translateY: 0 }}
        transition={{
          type: 'timing',
          duration: 1000,
        }}>
            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]} numberOfLines={1}>{data.title}</Text>
            {/* <Image style={{ width: '100%', height: 80, borderRadius: 10, display: showImg ? 'flex' : 'none' }} source={require('../../assets/images/green_field.jpg')} /> */}
            <Text style={{ display: isShow ? 'flex' : 'none' }}>{data.content}</Text>
            <Text style={[AppStyle.text, { flex: 1, marginTop: 5, display: isShow ? 'none' : 'flex' }]}>Người Đăng :{data.author}</Text>
            <View style={[AppStyle.row, { width: '100%', marginTop: 5 }]}>

                <Text style={[AppStyle.text, { flex: 1 }]}>Thời gian :{data.date.slice(0,10)}</Text>

                <Text style={[AppStyle.text, { flex: 1, display: isShow ? 'flex' : 'none' }]}>Người Đăng :{data.author}</Text>

                <TouchableOpacity onPress={facingShow} style={[AppStyle.column, { justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', flex: 1 }]}>
                    <Text style={[AppStyle.titleSmall, { fontWeight: '400', alignSelf: 'flex-end' }]}> {isShow ? "Ẩn bớt" : "Xem thêm"}</Text>
                </TouchableOpacity>
            </View>
        </MotiView>
    )
}

export default ItemStudy