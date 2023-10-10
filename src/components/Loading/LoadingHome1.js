import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LoadingHome1 = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} >
      <View style={{height:150,width:350,backgroundColor:'#fff1ce'}}>
      <SkeletonPlaceholder.Item width={350} height={20} borderRadius={10} />
      <SkeletonPlaceholder.Item flexDirection="row"  marginTop={5}>
        <SkeletonPlaceholder.Item width={130} height={100} borderRadius={10} />
        <SkeletonPlaceholder.Item marginLeft={8}>
          <SkeletonPlaceholder.Item width={300} height={10} marginTop={10} />
          <SkeletonPlaceholder.Item marginTop={6} width={300} height={10} />
          <SkeletonPlaceholder.Item marginTop={6} width={300} height={10} />
          <SkeletonPlaceholder.Item marginTop={6} width={300} height={10} />
          <SkeletonPlaceholder.Item marginTop={6} width={300} height={10} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      </View>
    </SkeletonPlaceholder>
  )
}

export default LoadingHome1