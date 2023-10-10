import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'

const ItemCategory = (props) => {
    const { icon, backgroundColor, title } = props;
    return (
        <View style={[appStyle.column, { alignItems: 'center',}]}>
            <TouchableOpacity style={[styles.boxItem, {backgroundColor: backgroundColor}]}>
                <Image style={[styles.icon, {}]} source={icon} />
            </TouchableOpacity>
            <Text style={[appStyle.text, { marginTop: 8, width: 70,  textAlign: 'center' }]} numberOfLines={1}>{title}</Text>

        </View>
    )
}

export default ItemCategory

const styles = StyleSheet.create({
    boxItem: {
        flexDirection: 'column',
        padding: 6,
        alignItems: 'center',
        
        borderRadius: 4,

    },
    icon: {
        width: 60,
        height: 60,
        tintColor: COLOR.white,
    }
})