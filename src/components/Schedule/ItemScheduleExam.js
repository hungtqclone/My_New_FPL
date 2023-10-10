import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'

const ItemSchedule = (props) => {
    const { data } = props
   
    const [isShow, setIsShow] = useState(false)
    const facingShow = () => {
        return setIsShow(!isShow)
    }
    return (
        <View style={{}}>
            <TouchableOpacity onPress={facingShow} style={[AppStyle.column, AppStyle.boxShadow, { backgroundColor: COLOR.background, borderRadius: 8, width: "100%", minHeight: 94, marginBottom: 10, padding: 12 }]}>
                <View style={AppStyle.row}>
                    <View style={[AppStyle.column, { backgroundColor: "#FFE9B1", width: 165, padding: 10, borderRadius: 10, borderWidth: 1.5, borderColor: "#FF640D" }]}>
                        <View style={[AppStyle.row, { justifyContent: 'center', }]}>
                            <Image style={[AppStyle.iconMedium, { top: 3, marginRight: 5, }]} source={require('../../assets/icons/ic_location.png')} />
                            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>{data.location}</Text>
                        </View>
                        <View style={[AppStyle.row, { marginTop: 2, justifyContent: 'space-between', alignItems: 'center' }]}>
                            <View style={[AppStyle.row, { marginTop: 8, justifyContent: 'center', }]}>
                                <Image style={[AppStyle.iconMedium, { top: 3, marginRight: 5, }]} source={require('../../assets/icons/ic_clock.png')} />
                                <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>{data.time}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[AppStyle.column, { marginLeft: 10, width: 145 }]}>
                        <Text style={[AppStyle.titleMedium, { fontSize: 18, fontWeight: '500' }]}>{data.idSubject.nameSubject}</Text>
                        <View style={AppStyle.row}>
                            <Text>Mã môn: </Text>
                            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>{data.idSubject.codeSubject}</Text>
                        </View>
                        <View style={AppStyle.row}>
                            <Text>Giảng Viên: </Text>
                            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>{data.idSubject.instructor}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={facingShow} style={{ alignSelf: 'center' }}>
                        <Image style={AppStyle.iconMedium} source={isShow ? require('../../assets/icons/ic_down.png') : require('../../assets/icons/ic_right.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{width:'100%',display:isShow? 'flex' : 'none'}}>
                    <Text style={{width:'100%',height:1,borderWidth:0.7,borderColor:'#D1D0D0',marginVertical:10,}}></Text>
                    <View style={AppStyle.row}>
                        <Text>Giảng đường: </Text>
                        <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>CVPM Quang Trung</Text>
                    </View>
                    <View style={AppStyle.row}>
                        <Text>Lớp: </Text>
                        <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>CP17310</Text>
                    </View>
                    <Text>Ngày: <Text style={{fontWeight:'800',color:'black'}}>{data.date.slice(0,10)}</Text></Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ItemSchedule