import { Image, StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../theme/color'
import { appStyle } from '../theme/appStyle'
import ItemButton from './ItemButton'
import ItemButtonWhite from './ItemButtonWhite'
import ItemIngredient from './ItemIngredient'
const DATA = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]
const ItemTabDetail = () => {
  const [showIngredient, setShowIngredient] = useState(true)
  return (
    <View style={[styles.tabBottom, { height: showIngredient ? '55%' : '18%' }]}>
      <View style={[appStyle.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }]}>
        <Text style={[appStyle.text16, { maxWidth: 180, }]} numberOfLines={2}>Ingredient</Text>
        <TouchableOpacity onPress={() => { setShowIngredient(!showIngredient) }}>
          {
            showIngredient ?
             (<Image style={[appStyle.smallIcon, { tintColor: COLOR.icon }]} source={require('../assets/icons/ic_down.png')} />):
             (<Image style={[appStyle.smallIcon, { tintColor: COLOR.icon }]} source={require('../assets/icons/ic_up.png')} />)
          }
          
        </TouchableOpacity>
        <Text style={[appStyle.text16, { maxWidth: 180, }]} numberOfLines={2}>              </Text>
      </View>
      {
        showIngredient ?
          (<View style={{ height: '75%' }}>
            <FlatList
              shouldRasterizeIOS
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={DATA}
              renderItem={({ item }) => <ItemIngredient data={item} />}
              keyExtractor={item => item.id}
            />
          </View>)
          :
          (<></>)
      }

      <View style={[appStyle.row, { justifyContent: 'space-between', width: '100%', marginVertical: 8 }]}>
        <ItemButtonWhite title={"Text Btn"} width={0.45} />
        <ItemButton title={"Text Btn"} width={0.45} />
      </View>
    </View>

  )
}

export default ItemTabDetail

const styles = StyleSheet.create({
  tabBottom: {
    backgroundColor: COLOR.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,

    paddingVertical: 16,
    paddingHorizontal: 16,
    zIndex: 900,

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

  }
})