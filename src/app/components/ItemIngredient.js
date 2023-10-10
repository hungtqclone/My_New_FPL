import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../theme/color'
import { appStyle } from '../theme/appStyle'

const ItemIngredient = () => {
    const [inputValue, setInputValue] = useState(1);

    const decreaseValue = () => {
        if (inputValue > 1) {
            setInputValue(inputValue - 1);
        }
    };

    const increaseValue = () => {
        if (inputValue < 999) {
            setInputValue(inputValue + 1);
        }
    };

    const handleInputChange = (text) => {
        const numericValue = parseInt(text);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 999) {
            setInputValue(numericValue);
        }
    };
    return (
        <View style={styles.boxItem}>
            <View style={styles.boxContent}>
                <Image style={styles.iconFood} source={require('../assets/images/food1.jpg')} />
                <View style={[appStyle.column, { marginLeft: 12, }]}>
                    <Text style={[appStyle.text14Bold, { maxWidth: 160,  }]} numberOfLines={1}>TextTe </Text>
                    <Text style={[appStyle.text14Normal, { maxWidth: 180, }]} numberOfLines={1}>Text</Text>
                </View>
            </View>
            <View style={styles.boxEditNum}>
                <TouchableOpacity style={styles.leftBtn} onPress={decreaseValue}>
                    <Image style={appStyle.smallIcon} source={require('../assets/icons/ic_minus.png')} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={inputValue.toString()}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.rightBtn} onPress={increaseValue}>
                    <Image style={appStyle.smallIcon} source={require('../assets/icons/ic_plus.png')} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ItemIngredient

const styles = StyleSheet.create({
    boxItem: {
        backgroundColor: COLOR.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 16,
        paddingHorizontal: 6,
        borderBottomWidth:0.3,


    },
    boxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',


    },
    iconFood: {
        width: 36,
        height: 36,
        borderRadius: 100,

    },
    boxEditNum: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftBtn: {
        backgroundColor: COLOR.bgContainer,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 8,
        alignItems: 'center',
        height: 30,

    },
    rightBtn: {
        backgroundColor: COLOR.bgContainer,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        padding: 8,
        alignItems: 'center',
        height: 30,

    },
    input: {
        borderWidth: 0.2,
        borderColor: COLOR.border,
        fontWeight: '500',
        fontStyle: 'normal',
        fontSize: 12,
        paddingVertical: 0,
        height: 28,
        textAlign: 'center',
    },
})