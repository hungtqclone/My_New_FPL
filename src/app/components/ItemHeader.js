import { SafeAreaView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { COLOR } from '../theme/color'
import { appStyle } from '../theme/appStyle'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../constants/AppContext'

const ItemHeader = (props) => {
    const navigation = useNavigation()
    const { showBottom, setShowBottom } = useContext(AppContext)
    const { title, onPressSearch } = props;
    return (
        <SafeAreaView style={styles.boxHeader} >
            <TouchableOpacity onPress={() => { [navigation.goBack(), setShowBottom(true)] }}>
                <Image style={[appStyle.icon, { tintColor: COLOR.icon, width: 18 }]} source={require('../assets/icons/ic_left_arrow.png')} />
            </TouchableOpacity>

            <Text style={appStyle.title}>{title}</Text>
            
            <TouchableOpacity onPress={onPressSearch}>
                <Image style={[appStyle.icon, { tintColor: COLOR.icon }]} source={require('../assets/icons/ic_search.png')} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ItemHeader

const styles = StyleSheet.create({
    boxHeader: {
        paddingHorizontal: 16,
        backgroundColor: COLOR.background,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 18,

    }
})