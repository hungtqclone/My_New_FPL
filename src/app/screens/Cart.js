import { SafeAreaView, StyleSheet, FlatList, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ItemHeader from '../components/ItemHeader'
import ItemSaveDish from '../components/ItemSaveDish'
import { appStyle } from '../theme/appStyle'
import ItemCart from '../components/ItemCart'
import { COLOR } from '../theme/color'
import ItemDishAndPrice from '../components/ItemDishAndPrice'
import ItemButton from '../components/ItemButton'
const DATA = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
const Cart = () => {
  return (
    <SafeAreaView style={appStyle.container}>
      <ItemHeader title={"Cart"} />

      <View style={{ height: '40%', paddingTop: 16, width: '100%' }}>
        <FlatList
          style={{}}
          contentContainerStyle={{ justifyContent: 'space-between', marginHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={({ item }) => <ItemCart data={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.boxSummary}>
        <Text style={[appStyle.text16, { maxWidth: 190, marginBottom: 12 }]} numberOfLines={1} >Summary ( 12 )</Text>
        <ScrollView showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>

          <View style={{ height: '30%', marginBottom: 12 }}>
            <FlatList
              nestedScrollEnabled
              style={{}}
              contentContainerStyle={{ justifyContent: 'space-between', }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={DATA}
              renderItem={({ item }) => <ItemDishAndPrice data={item} />}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.boxTotal}>
            <Text style={[appStyle.text16, { maxWidth: 190, marginBottom: 12 }]} numberOfLines={1} >Total Price</Text>
            <Text style={[appStyle.text16, { maxWidth: 190, marginBottom: 12, color: COLOR.primary, }]} numberOfLines={1} >1.000.000</Text>
          </View>
          <ItemButton width={1} title={"Pay"} />
        </ScrollView>

      </View>

    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  boxSummary: {
    backgroundColor: COLOR.background,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,


    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -10, // Đổi dấu âm để đổ bóng ở phía trên
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  boxTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    marginBottom: 12

  }
})