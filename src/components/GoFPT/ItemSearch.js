import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Theme'
import { AppStyle } from '../../constants/AppStyle'
import FastImage from 'react-native-fast-image'

const ItemSearch = (props) => {
    const { placeholder, placeholderTextColor,
        icon, tintColor,
        backgroundColor, onChangeText,
        fontWeight, fontSize, textButtonColor, titleButton,
        onPressRight, onPressSearch,
        marginBottom,
        onPressMic
    } = props;
    return (
        <TouchableOpacity style={[styles.boxMain, {
            backgroundColor: backgroundColor == null ? COLOR.background : backgroundColor,
            marginBottom: marginBottom == null ? 0 : marginBottom
        }]} onPress={onPressSearch}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '90%' }}>
                <View style={styles.boxInput}>
                    <Image style={[styles.icon, {
                        tintColor: tintColor == null ? "black" : tintColor,
                    }]} source={icon == null ? require('../../assets/icons/ic_search.png') : icon} />
                    <TextInput style={[AppStyle.text12, { height: 36, marginLeft: 8, width: '90%' }]} placeholder='Nhập địa điểm ...' placeholderTextColor={'#6D6D6D'}
                        onChangeText={onChangeText} />
                </View>
                <TouchableOpacity style={styles.button} onPress={onPressMic}>
                    {/* <Text style={[AppStyle.text12, {
                        fontWeight: fontWeight == null ? '700' : fontWeight,
                        color: textButtonColor == null ? COLOR.white : textButtonColor,
                    }]}>{titleButton == null ? "Tìm kiếm" : titleButton}</Text> */}

                    <FastImage style={{width:24,height:24}} source={require('../../assets/icons/ic_mic.png')} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ width: '10%', alignItems: 'center', justifyContent: 'center', }}
                onPress={onPressRight}>
                <Image style={styles.icon} source={require('../../assets/icons/ic_filter.png')} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ItemSearch

const styles = StyleSheet.create({
    boxMain: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
    },
    boxInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 8,
        height: 40,
        width: '75%',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderColor: '#6A6A6A',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,

    },
    icon: {
        width: 18,
        height: 18,


    },
    button: {
        backgroundColor: COLOR.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
        height: 40,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#F26F25'

    }
})