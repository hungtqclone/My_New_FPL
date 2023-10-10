import React from 'react';
import { View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native'

const slides = [
  {
    key: 'slide1',
    title: 'Slide 1',
    text: 'This is slide 1',
    image: require('../assets/images/bg3.jpg'),
  },
  {
    key: 'slide2',
    title: 'Slide 2',
    text: 'This is slide 2',
    image: require('../assets/images/bg4.jpg'),
  },
  {
    key: 'slide3',
    title: 'Slide 3',
    text: 'This is slide 3',
    image: require('../assets/images/bg5.jpg'),
  },
];

const IntroScreen = () => {
    const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={item.image} />
      <Text>{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={() => {
        navigation.navigate("Begin")
      }}
    />
  );
};

export default IntroScreen;
