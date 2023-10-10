import React, { useState } from 'react';
import { View, PanResponder, Animated, StyleSheet } from 'react-native';
import Draggable from 'react-native-draggable';
const BubbleChat = () => {
  const [position, setPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: position.x, dy: position.y }
    ]),
    onPanResponderRelease: () => {
      // Xử lý logic khi thả bóng bóng
    }
  });

    return (
        <View >
            <Draggable x={75} y={100} renderSize={56} renderColor='black' renderText='A' isCircle  onShortPressRelease={()=>alert('touched!!')}/> 
            <Draggable imageSource={require('../assets/icons/ic_back.png')} x={100} y={300} renderSize={54} renderColor='red' renderText='B' isCircle/>
            <Draggable/>
        <Draggable x={50} y={50}>
        </Draggable>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
});

export default BubbleChat;
