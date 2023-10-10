import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Loading = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} >
      <View style={{height:100,width:200,backgroundColor:'#fff1ce'}}>
      <SkeletonPlaceholder.Item flexDirection="column"  marginTop={5}>
        <SkeletonPlaceholder.Item width={150} height={20} borderRadius={10} />
        <SkeletonPlaceholder.Item marginLeft={1}>
          <SkeletonPlaceholder.Item width={50} height={10} marginTop={10} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={10} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      </View>
    </SkeletonPlaceholder>
  )
}

export default Loading