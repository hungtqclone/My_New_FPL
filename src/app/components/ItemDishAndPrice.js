import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'

const ItemDishAndPrice = () => {
    return (
        <View style={styles.boxItem}>
            <Text style={[appStyle.text14Bold, { maxWidth: 190, }]} numberOfLines={1} >Name Dish</Text>
            <Text style={[appStyle.text14Normal, { maxWidth: 190, }]} numberOfLines={1} >50.000</Text>

        </View>
    )
}

export default ItemDishAndPrice

const styles = StyleSheet.create({
    boxItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:"100%",
        borderBottomColor:COLOR.border,
        borderBottomWidth:0.2,
        padding:8,

    }
})