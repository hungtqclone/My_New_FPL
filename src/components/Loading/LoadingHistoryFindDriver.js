import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LoadingHistoryFindDriver = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} >
    <View style={{height:200,width:400,backgroundColor:'#fff1ce'}}>
    <SkeletonPlaceholder.Item flexDirection="row"  marginTop={5} marginLeft={10}>
        <SkeletonPlaceholder.Item width={120} height={20} marginTop={10} />
        <SkeletonPlaceholder.Item marginTop={10} width={150} height={20}   marginLeft={60}/>
    </SkeletonPlaceholder.Item>
    <SkeletonPlaceholder.Item flexDirection="row"  marginTop={5} marginLeft={10}>
        <SkeletonPlaceholder.Item width={120} height={10} marginTop={10} />
        <SkeletonPlaceholder.Item marginTop={10} width={150} height={10}   marginLeft={60}/>
    </SkeletonPlaceholder.Item>
    <SkeletonPlaceholder.Item flexDirection="row"  marginTop={5} marginLeft={10}>
        <SkeletonPlaceholder.Item width={120} height={10} marginTop={10} />
        <SkeletonPlaceholder.Item marginTop={10} width={150} height={10}   marginLeft={60}/>
    </SkeletonPlaceholder.Item>
    <SkeletonPlaceholder.Item flexDirection="row"  marginTop={5} marginLeft={10}>
        <SkeletonPlaceholder.Item width={120} height={10} marginTop={10} />
        <SkeletonPlaceholder.Item marginTop={5} width={150} height={30}   marginLeft={60}/>
    </SkeletonPlaceholder.Item>
    </View>
  </SkeletonPlaceholder>
  )
}

export default LoadingHistoryFindDriver

const styles = StyleSheet.create({})