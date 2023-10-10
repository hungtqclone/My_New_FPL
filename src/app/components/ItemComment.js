import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appStyle } from '../theme/appStyle'
import { COLOR } from '../theme/color'

const ItemComment = (props) => {
    const { avatar, name, comment, date } = props
    return (
        <View style={[appStyle.row, styles.boxItem, {}]}>
            <View style={[appStyle.column, { alignItems: "center", width: 70, }]}>
                <Image style={appStyle.avatarComment} source={require('../assets/images/defaultAvatar.png')} />
                <Text style={[appStyle.text12, { maxWidth: 100, paddingVertical: 2, fontWeight: '500', }]} numberOfLines={1} >Name User</Text>
            </View>
            <View style={styles.boxContents}>
                <Text style={[appStyle.text12, { paddingVertical: 2, lineHeight: 18 }]} numberOfLines={3} >TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText</Text>
                <Text style={[appStyle.text10, { paddingVertical: 2, lineHeight: 18 }]} numberOfLines={1} >Date Time Date Time</Text>
            </View>
        </View>
    )
}

export default ItemComment

const styles = StyleSheet.create({
    boxItem: {
        backgroundColor: COLOR.background,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginBottom:12,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3

    },
    boxContents: {
        flex: 1,
        marginLeft: 16,

    }
})