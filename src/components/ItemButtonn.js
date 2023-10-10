import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Theme'

const ItemButtonn= (props) => {
    const { title, textColor, fontSize, fontWeight, textAlign, fontStyle,
        backgroundColor, borderRadius, width, paddingVertical,
        onPress
    } = props
    return (
        <TouchableOpacity style={[styles.ItemButtonn, {
            backgroundColor: backgroundColor == null ? COLOR.white : backgroundColor,
            borderRadius: borderRadius == null ? 8 : borderRadius,
            paddingVertical: paddingVertical == null ? 4 : paddingVertical,
            width: width == null ? '100%' : width,
            borderWidth:  1, 
            borderColor: COLOR.primary,

        }]}
        onPress={onPress}>
            <Text style={[styles.textButtonn, {
                textAlign: textAlign == null ? "center" : textAlign,
                color: textColor == null ? COLOR.primary : textColor,
                fontWeight: fontWeight == null ? '500' : fontWeight,
                fontSize: fontSize == null ? 14 : fontSize,
                fontStyle: fontStyle == null ? 'normal' : fontStyle,

            }]}>{title == null ? "Button" : title}</Text>
        </TouchableOpacity>
    )
}

export default ItemButtonn

const styles = StyleSheet.create({
    ItemButtonn: {
        alignItems: 'center',
        justifyContent: "center",

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
        
    },
    textButton: {
        letterSpacing: 0.5,
    }
})