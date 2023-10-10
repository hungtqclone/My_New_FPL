import { StyleSheet, Image, FlatList, SafeAreaView, Dimensions, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ItemHeader from '../components/ItemHeader'
import { appStyle } from '../theme/appStyle'
import Carousel from 'react-native-snap-carousel';
import { COLOR } from '../theme/color';
import ItemComment from '../components/ItemComment';
import { AppContext } from '../constants/AppContext';
import ItemTabDetail from '../components/ItemTabDetail';
const DATA = [{}, {}, {}]
const FoodSlider = () => {
  const { width } = Dimensions.get('window');

  const images = [
    require('../assets/images/food1.jpg'),
    require('../assets/images/food2.jpg'),
    require('../assets/images/food3.jpg'),

  ];

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={item}
        style={{ width: width * 0.6, height: width * 0.8, borderRadius: 20 }}
      />
    </View>
  );

  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width * 0.6}
      layout={'default'}
      loop={true}
    />
  );
};
const Detail = () => {
  const { showBottom, setShowBottom } = useContext(AppContext)
  useEffect(() => {

    return () => {

    }
  }, [])

  return (
    <>
      <ScrollView style={appStyle.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <ItemHeader title={"Detail"} />

        <View style={{ marginVertical: 8 }}>
          <FoodSlider />
        </View>

        <View style={styles.boxContent}>
          <View style={[appStyle.row, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>
            <Text style={[appStyle.text16, { maxWidth: 180, }]} numberOfLines={2}>TextTextTextTextTextTextTextText </Text>
            <Text style={[appStyle.text16, { color: COLOR.primary, maxWidth: 80, }]} numberOfLines={1}>TextText </Text>
          </View>

          <View style={styles.boxDescription}>
            <Text style={[appStyle.text14Normal, { maxWidth: 260, paddingVertical: 4 }]} numberOfLines={1} >TextTextsadsadasdTextTextTeText</Text>
            <Text style={[appStyle.text14Normal, { maxWidth: 260, paddingVertical: 4 }]} numberOfLines={1} >TextTextsadsadasdTextTextTeText</Text>
            <View style={appStyle.row}>
              <Text style={[appStyle.text14Normal, { maxWidth: 260, paddingVertical: 4 }]} numberOfLines={1} >Text</Text>
              <Text style={[appStyle.text14Normal, { maxWidth: 260, paddingVertical: 4, color: COLOR.primary, paddingLeft: 8 }]} numberOfLines={1} >TxtTextTeText</Text>
            </View>
            <Text style={[appStyle.text14Normal, { maxWidth: 360, paddingVertical: 12, }]} numberOfLines={3} >TextTextsadsadasdTextTextTeTextTextTextsadsadasdTextTextTeTextTextTextsadsadasdTextTextTeTextTextTextsadsadasdTextTextTeTextTextTextsadsadasdTextTextTeTextTextTextsadsadasdTextTextTeText</Text>
          </View>

        </View>
        <View style={styles.boxComment}>
          <Text style={[appStyle.text16, { maxWidth: 180, marginBottom: 12 }]} numberOfLines={2}>Comment </Text>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <ItemComment data={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      <ItemTabDetail />
    </>
  )
}

export default Detail

const styles = StyleSheet.create({
  boxContent: {

    paddingHorizontal: 16,
    paddingVertical: 16,

  },
  boxDescription: {
    paddingVertical: 12,
  },
  boxComment: {
    marginHorizontal: 16,
    marginBottom: 160,
  }
})