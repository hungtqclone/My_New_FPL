import { StyleSheet, FlatList, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useCallback, useEffect, useState } from 'react'
import { AppStyle } from '../../constants/AppStyle'

import ItemSearch from '../../components/GoFPT/ItemSearch'
import ItemHistoryPosted from '../../components/GoFPT/ItemHistoryPosted'
import { AppContext } from '../../utils/AppContext'
import AxiosInstance from '../../constants/AxiosInstance';
import ActionButton from 'react-native-action-button';
import ItemFindDriver from '../../components/GoFPT/ItemFindDiver'
import ItemFindGoWith from '../../components/GoFPT/ItemFindGoWith'
import { MotiView, MotiText } from 'moti'
import { COLOR } from '../../constants/Theme'

const FindGoWith = () => {
  const [dataFindDriver, setDataFindDriver] = useState([])
  const [showSearch, setShowSearch] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { idUser, infoUser, currentDay, appState, setAppState } = useContext(AppContext);
  const [available, setavailable] = useState(true)
  const [page, setPage] = useState(10)

  useEffect(() => {
    getListGoWith()
    return () => {

    }
  }, [appState])

  const getListGoWith = async () => {
    try {
      const response = await AxiosInstance().get("gofpt/api/get-by-typeFind?typeFind=1&page=" + page);

      // console.log("===================================response", response);

      if (response.result) {
        if (Array.isArray(response.post) && response.post.length === 0) {
          console.log("post là một mảng rỗng");
          setavailable(false)

        } else {
          console.log("post không phải là một mảng rỗng");
          setIsLoading(false)
          setDataFindDriver(response.post);
          setavailable(true)

        }
      } else {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearch = async (keyword) => {
    TimerMixin.setTimeout(() => {
      onSearch(keyword)
    }, 2000);
  }

  const onSearch = async (keyword) => {
    try {
      console.log("==============>", keyword);
      // const response = await AxiosInstance().get("gofpt/api/get-by-location", { keyword: keyword, typeFind: 1});
      const response = await AxiosInstance().get("gofpt/api/get-by-location?keyword=" + keyword + "&typeFind=2");
      console.log(response);
      if (response.result) {

        if (Array.isArray(response.post) && response.post.length === 0) {
          Toast.show({
            position: 'top',
            type: 'success',
            text1: 'KhÔng tìm thấy kết quả phù hợp',
          });
          console.log("get-by-location " + keyword + " là một mảng rỗng");
          setavailable(false)

        } else {
          console.log("get-by-location " + keyword + " không phải là một mảng rỗng");
          setDataFindDriver(response.post)
          setIsLoading(false);
          setavailable(true)
        }
      } else {
        setavailable(false)
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  return (
    <MotiView style={[AppStyle.main, { marginTop: 8 }]}
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'timing',
        duration: 350,
      }}>
      {
        available
          ? (
            <FlatList
              style={{ marginVertical: 0, marginBottom: 70 }}
              data={dataFindDriver}
              showsHorizontalScrollIndicator={false}
              shouldRasterizeIOS
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <ItemFindGoWith data={item} />}
              keyExtractor={item => item.id}
              ListHeaderComponent={() => (
                <View>
                  <ItemSearch marginBottom={10}
                    // onPressRight={() => { { toggleModal(true) } }}
                    onPressSearch={() => { getListDriver() }}
                    onChangeText={(keyword) => handleSearch(keyword)} />
                </View>
              )}

              ListFooterComponent={<View style={{ width: '100%' }}>
                <TouchableOpacity onPress={() => { setPage((pre) => pre + 10) }} style={styles.buttonMore}>
                  <Text style={styles.textMore}>Hiện thêm</Text>
                </TouchableOpacity>
              </View>}
            />
          )
          : (
            <View style={{ flex: 1, backgroundColor: COLOR.background, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: '600', color: COLOR.primary, fontSize: 18, }}>Chưa co tin tìm yên sau mới</Text>
            </View>
          )
      }
    </MotiView>
  )
}

export default FindGoWith

const styles = StyleSheet.create({
  buttonMore: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textMore: {
    fontSize: 14,
    color: 'green',
    fontWeight: '600',
  }
})