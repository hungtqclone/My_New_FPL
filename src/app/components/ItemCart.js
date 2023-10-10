import { StyleSheet, Image, TextInput, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'
import { useNavigation } from '@react-navigation/native'

const ItemCart = () => {
    const navigation = useNavigation();

    useEffect(() => {

        return () => {

        }
    }, [])
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
        <View style={[appStyle.row, styles.boxItem]}>
            <Image style={styles.image} source={require('../assets/images/food1.jpg')} />
            <View style={styles.boxContent}>
                <View style={[appStyle.row, { justifyContent: 'space-between', alignItems: 'center', width: '100%' }]}>
                    <Text style={[appStyle.text16, { maxWidth: 190, }]} numberOfLines={1} >Name Dish</Text>
                    <TouchableOpacity onPress={() => { { } }}>
                        <Image style={appStyle.smallIcon} source={require('../assets/icons/ic_close.png')} />
                    </TouchableOpacity>
                </View>

                <Text style={[appStyle.text12, { marginTop: 4, maxWidth: 190, }]} numberOfLines={1}>Discription dish</Text>

                <View style={styles.boxNum}>
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
                    <Text style={[appStyle.text16, { fontStyle: "italic" }]}>50.000</Text>
                </View>


            </View>
        </View>
    )
}

export default ItemCart

const styles = StyleSheet.create({
    boxItem: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: COLOR.background,
        borderRadius: 8,
        marginBottom: 16,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3

    },
    image: {
        width: 100,
        height: "100%",
        borderRadius: 12,

    },
    boxContent: {
        flex: 1,
        marginLeft: 8,
        alignItems: 'flex-start',


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
    boxNum: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 14,
    }
})