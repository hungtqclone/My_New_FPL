import { StyleSheet, Text, View, Image, Modal, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { AppStyle } from '../../constants/AppStyle'
import { COLOR } from '../../constants/Theme'
import FastImage from 'react-native-fast-image';
import { appStyle } from '../../app/theme/appStyle';

const ItemScheduleToday = (props) => {
    const { data } = props
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const Overlay = () => (
        <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setOverlayVisible(false)}
        />
    );

    const Panel = () => (
        <View style={styles.panel}>
            <Text style={AppStyle.titleMedium}>Thông tin môn học</Text>
            <View style={{ marginTop: 10 }}>
                <View style={[AppStyle.column, AppStyle.boxShadow, { backgroundColor: COLOR.background, borderRadius: 8, width: "100%", minHeight: 94, marginBottom: 10, padding: 12 }]}>
                    <View style={AppStyle.row}>
                        <View style={[AppStyle.column, { backgroundColor: "#FFE9B1", width: 165, padding: 10, borderRadius: 10, borderWidth: 1.5, borderColor: "#FF640D" }]}>
                            <View style={[AppStyle.row, { justifyContent: 'center', }]}>
                                <FastImage style={[AppStyle.iconMedium, { top: 3, marginRight: 5, }]} source={require('../../assets/icons/ic_location.png')} />
                                <Text style={[AppStyle.titleSmall, { color: COLOR.title }]}>{data.location}</Text>
                            </View>
                            <View style={[AppStyle.row, { marginTop: 2, justifyContent: 'space-between', alignItems: 'center' }]}>
                                <View style={[AppStyle.row, { marginTop: 8, justifyContent: 'center', }]}>
                                    <FastImage style={[AppStyle.iconMedium, { top: 3, marginRight: 5, }]} source={require('../../assets/icons/ic_clock.png')} />
                                    <Text style={[AppStyle.titleSmall, { color: COLOR.title }]}>Ca {data.shift} | </Text>
                                    <Text style={[AppStyle.titleSmall, { color: COLOR.title }]}>{data.time}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[AppStyle.column, { marginLeft: 10, width: 145 }]}>
                            <Text style={[AppStyle.titleMedium, { fontSize: 18, fontWeight: '500' }]}>{data.idSubject.nameSubject}</Text>
                            <View style={AppStyle.row}>
                                <Text style={appStyle.text14}>Mã môn: </Text>
                                <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>{data.idSubject.codeSubject}</Text>
                            </View>
                            <View style={AppStyle.row}>
                                <Text style={appStyle.text14}>Giảng Viên: </Text>
                                <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>{data.idSubject.instructor}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', }}>
                        <Text style={{ width: '100%', height: 1, borderWidth: 0.7, borderColor: '#D1D0D0', marginVertical: 10, }}></Text>
                        <View style={AppStyle.row}>
                            <Text style={appStyle.text14}>Giảng đường: </Text>
                            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>CVPM Quang Trung</Text>
                        </View>
                        <View style={AppStyle.row}>
                            <Text style={appStyle.text14}>Lớp: </Text>
                            <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>CP17310</Text>
                        </View>
                        <View style={[AppStyle.row, { justifyContent: 'space-between', width: '100%', }]}>
                            <View style={AppStyle.row}>
                                <Text style={appStyle.text14}>Buổi thứ: </Text>
                                <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>{data.lesson}/15</Text>
                            </View>
                            <Text style={[AppStyle.titleSmall, { color: COLOR.normalText, }]}>{data.date.slice(0, 10)}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => setOverlayVisible(false)} style={AppStyle.buttonBlue}>
                <Text style={AppStyle.titleButton}>Đóng</Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <TouchableOpacity style={[AppStyle.row, AppStyle.boxShadow, { backgroundColor: COLOR.background, borderRadius: 8, width: 270, height: 94, marginTop: 6, marginBottom: 10, marginRight: 10 }]}
            onPress={() => setOverlayVisible(true)}>
            <View style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: COLOR.primary, height: 94, width: 10 }}></View>
            <View style={[AppStyle.column, { paddingVertical: 12, paddingHorizontal: 8, }]}>
                <View style={[AppStyle.row, { alignItems: 'center', justifyContent: 'space-between', width: 230, }]}>
                    <Text style={[AppStyle.titleMedium, { color: COLOR.title }]}>{data.idSubject.nameSubject}</Text>
                    <Text style={[AppStyle.text, { color: COLOR.normalText, fontWeight: '700' }]}>{data.idSubject.codeSubject}</Text>
                </View>
                <View style={[AppStyle.row, { marginTop: 8, justifyContent: 'center', }]}>
                    <FastImage style={[AppStyle.iconSmall, { top: 3, marginRight: 5, }]} source={require('../../assets/icons/ic_location.png')} />
                    <Text style={[AppStyle.titleSmall, { color: COLOR.title }]}>{data.location}</Text>
                </View>
                <View style={[AppStyle.row, { marginTop: 2, justifyContent: 'space-between', width: 230, alignItems: 'center' }]}>
                    <View style={[AppStyle.row, { marginTop: 8, justifyContent: 'center', }]}>
                        <FastImage style={[AppStyle.iconSmall, { top: 3, marginRight: 5, }]} source={require('../../assets/icons/ic_clock.png')} />
                        <Text style={[AppStyle.titleSmall, { color: COLOR.title }]}>Ca {data.shift} | </Text>

                        <Text style={[AppStyle.titleSmall, { color: COLOR.title }]}>{data.time}</Text>
                    </View>
                    <TouchableOpacity style={[AppStyle.column, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => setOverlayVisible(true)}>
                        <Text style={[AppStyle.titleSmall, { fontWeight: '400' }]}>Chi tiết</Text>
                        <View style={{ height: 1, width: 30, backgroundColor: COLOR.primary }} />
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={isOverlayVisible} transparent>
                <View style={styles.container}>
                    <Overlay />
                    <Panel />
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

export default ItemScheduleToday

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    panel: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: '95%'
    },
})