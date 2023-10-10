import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'

const ItemActivate = (props) => {
    const { data } = props
    const navigation = useNavigation()
    // const { title, content, name, date } = data

    const goDetail = () => {
        console.log("ID", data._id);
        navigation.navigate("DetailsNew", { id: data._id })

    }

    return (
        <TouchableOpacity onPress={() => goDetail()} style={[AppStyle.item, { width: "100%", paddingHorizontal: 0, paddingVertical: 0, borderRadius: 30, marginBottom: 20 }]}>
            <Image style={{ width: "100%", height: 140, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} source={{ uri: data.image }} />

            <View style={{ paddingHorizontal: 10, marginBottom: 12 }}>
                <Text style={[AppStyle.titleBig, { textAlign: "center", marginTop: 10 }]} numberOfLines={1}>{data.title}</Text>
                <Text style={[AppStyle.titleSmall, { marginVertical: 8, width: '98%', color: COLOR.newText, fontWeight: '400' }]} numberOfLines={2}>{data.content}</Text>
                <View style={[AppStyle.row, { marginBottom: 8 }]}>
                    <Text style={[AppStyle.text, { flex: 1, color: '#787878', fontSize: 10, }]}>Người Đăng :{data.author}</Text>
                    <Text style={[AppStyle.text, { flex: 1, textAlign: 'right', color: '#787878', fontSize: 10, }]}>Thời gian :{data.date.slice(0, 10)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default ItemActivate