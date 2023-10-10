import { SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { appStyle } from '../theme/appStyle'
import ItemSearch from '../components/ItemSearch'
import { COLOR } from '../theme/color'
import ItemDish from '../components/ItemDish'
import ItemCategory from '../components/ItemCategory'
import { AppContext } from '../constants/AppContext'
const DATA = [
  {}, {}, {},
  {}, {}, {},
];
const Home = () => {
  const { showBottom, setShowBottom } = useContext(AppContext)
  useEffect(() => {

    return () => {

    }
  }, [])

  return (
    <SafeAreaView style={appStyle.container}>
      <ScrollView style={styles.boxMain}>
        <View style={[appStyle.row, { justifyContent: 'flex-start', alignItems: 'center', marginTop: 8, marginHorizontal: 16, }]}>
          <TouchableOpacity style={[appStyle.boxIcon]}>
            <Image style={[appStyle.icon, {}]} source={require('../assets/icons/ic_filter.png')} />
          </TouchableOpacity>
          <View style={appStyle.inputSearch}>
            <TextInput placeholder='Search ... ' />
            <Image style={[appStyle.icon, {}]} source={require('../assets/icons/ic_search.png')} />
          </View>
        </View>

        <View style={[appStyle.row, { marginTop: 8, marginHorizontal: 16, }]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={DATA}
            horizontal
            renderItem={({ item }) => <ItemSearch data={item} />}
            keyExtractor={item => item.id}
          />
        </View>

        <View style={[appStyle.column, { marginTop: 24, flex: 1 }]}>
          <View style={[appStyle.row, { alignItems: 'center', justifyContent: 'space-between', width: '92%', marginBottom: 8, marginHorizontal: 16, }]}>
            <Text style={[appStyle.title, { fontStyle: 'normal' }]}>Mon an noi bat</Text>
            <Text style={[appStyle.text, { color: COLOR.primary }]}>See more</Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={DATA}
            horizontal
            renderItem={({ item }) => <ItemDish data={item} />}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={[appStyle.column, { marginTop: 24, flex: 1, marginHorizontal: 16, }]}>
          <Text style={[appStyle.title, { fontStyle: 'normal' }]}>Category aaaaaa</Text>
          <View style={[appStyle.row, { marginTop: 16, width: '100%', justifyContent: 'space-between' }]}>
            <ItemCategory title={"Categoryy"} backgroundColor={COLOR.primary} icon={require('../assets/icons/ic_cart.png')} />
            <ItemCategory title={"Category 2"} backgroundColor={COLOR.blue} icon={require('../assets/icons/ic_search.png')} />
            <ItemCategory title={"Category 3"} backgroundColor={COLOR.light} icon={require('../assets/icons/ic_cart.png')} />
            <ItemCategory title={"Cat"} backgroundColor={COLOR.light} icon={require('../assets/icons/ic_cart.png')} />
          </View>
          <View style={[appStyle.row, { marginTop: 16, width: '100%', justifyContent: 'space-between' }]}>
            <ItemCategory title={"Categoryy"} backgroundColor={COLOR.primary} icon={require('../assets/icons/ic_cart.png')} />
            <ItemCategory title={"Category 2"} backgroundColor={COLOR.blue} icon={require('../assets/icons/ic_cart.png')} />
            <ItemCategory title={"food"} backgroundColor={COLOR.light} icon={require('../assets/icons/ic_cart.png')} />
            <ItemCategory title={"Cat"} backgroundColor={COLOR.light} icon={require('../assets/icons/ic_cart.png')} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  boxMain: {

    marginTop: 16
  }
})