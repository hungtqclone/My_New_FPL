import { StyleSheet, Text, View, Animated, RefreshControl, Image, Dimensions, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React ,{ useState, useRef, useEffect } from 'react'
import { MotiView, MotiText } from 'moti'
import TimerMixin from 'react-timer-mixin';
import Toast from 'react-native-toast-message';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStyle } from '../../constants/AppStyle'
import ItemSearch from '../../components/GoFPT/ItemSearch'
import ItemHistoryPosted from '../../components/GoFPT/ItemHistoryPosted'
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';
i

const Table = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(true)
    const [stateList, setStateList] = useState(0)
    const [refreshControl, setRefreshControl] = useState(false)
    const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Animated.View style={[styles.centerItem, {
          width: '100%', height: 50,
          opacity: animatedValue.interpolate({
            inputRange: [-1, 100],
            outputRange: [1, 0],
          }),
        }]}>
          <Text style={styles.title}>List Of HistoryPosted</Text>
        </Animated.View>
        <View style={{ marginBottom: 100 }}>
          {/* {
            isLoading == true ?
              (
                <View style={styles.loading}>
                  <ActivityIndicator size='large' color='#fffff' />
                  <Text>Loading....</Text>
                </View>
              )
              :
              ( */}
          <SwipeListView
            onScroll={e => {
              animatedValue.setValue(e.nativeEvent.contentOffset.y)
            }}

            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({ item }) => <ItemHistoryPosted data={item} navigation={navigation} />}
            keyExtractor={item => item._id}
            extraData={true}

            refreshControl={
              <RefreshControl refreshing={refreshControl} onRefresh={() => {
                setRefreshControl(true)
                console.log("Refresh")
                setStateList(stateList + 1)
                console.log(stateList)

                setRefreshControl(false)
              }} colors={['green']} />
            }

            
            renderHiddenItem={(data, rowMap) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    deleteItemHistoryPosted(data)
                  }}
                  style={{
                    height: 80,
                    backgroundColor: '#A42B32',
                    justifyContent: 'center',
                    marginHorizontal: 10,
                    alignItems: 'flex-end',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                  }}>
                  <Image
                    source={require('../assets/icons/ic_delete.png')}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: "blue",
                      marginRight: 30,
                      tintColor: 'white',
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={editItemHistoryPosted}
                  style={{
                    height: 80,
                    backgroundColor: '#74dc2e',
                    borderBottomLeftRadius: 20,
                    marginHorizontal: 10,
                    borderBottomRightRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Image
                    source={require('../assets/icons/ic_edit.png')}
                    style={{
                      width: 30,
                      height: 20,
                      tintColor: "blue",
                      marginRight: 30,
                      tintColor: 'white',
                    }}
                  />
                </TouchableOpacity>

              </>

            )}

            rightOpenValue={-85}
          />
          {/* )
          } */}
        </View>
      </View>
    </SafeAreaView>
    
  )
}

export default Table
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    main: {
      backgroundColor: 'white',
  
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#f15929'
    },
    centerItem: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: '#FFDD83',
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
  
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
