import { Text, TextInput, View, StatusBar, Image, Button, Touchable, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../components/Context'
import { useIsFocused } from '@react-navigation/native'
import KKList from '../components/KKList'
import Fuse from 'fuse.js'

export default function Search({ navigation, route }) {
  const { data, setData, loadDataF, storeDataF } = useContext(Context)
  const [searchData, setSearchData] = useState([])
  const [searchKeywords, setSearchKeywords] = useState('')
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && loadDataF) {
      loadDataF.func(setData)
    }
  }, [isFocused, loadDataF])

  useEffect(() => {
    if (route.params?.initKeywords)
      searchTimer(route.params.initKeywords, 250)
  }, [])

  const timer = useRef(null)

  const searchTimer = (keywords, delay) => {
    if (timer.current)
      clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      handleSearch(keywords)
    }, delay)
  }

  const handleSearch = (keywords) => {
    setSearchKeywords(keywords)
    const fuse = new Fuse(data, { includeScore: true, keys: ['nama', 'nik']})
    const result = fuse.search(keywords)
    // console.log(result)
    setSearchData(result.sort((a,b) => a.score - b.score).filter(res => res.score <= 0.25).map(res => res.item))
  }

  const handleStar = async (id) => {
    const newData = Array.from(data)
    const idx = newData.findIndex(item => item.id == id)
    if (newData[idx].starredOn)
      newData[idx].starredOn = null
    else
      newData[idx].starredOn = new Date()
    await storeDataF.func(newData, setData)
    navigation.navigate('Search', { refreshTimestamp: Date.now() })
  }

  const handleDelete = (ids) => {
    setData((prev) => { ids.forEach(id => prev.splice(prev.findIndex(item => item.id == id))); return prev })
    searchTimer(searchKeywords, 250)
  }

  return (
    <View className='w-full max-h-screen'>
      <View className='w-full h-screen flex flex-col bg-gray-100'>
        <View className='w-full h-16 px-8 flex flex-col bg-blue-500 rounded-b-[35px]'>
          <TextInput className='mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-base' placeholder='Cari No. KK, Kepala Keluarga...' onChangeText={(keywords) => searchTimer(keywords, 250)} defaultValue={route.params?.keywords ?? ''}></TextInput>
        </View>
        <View className='mt-2 px-2 flex-1 flex-col bg-white rounded-t-lg shadow-lg shadow-gray-600'>
          <View className='mt-2 mx-auto'>
            { (searchKeywords) ?
              <Text className='text-gray-500'>{ searchData.length } hasil ditemukan</Text> : ''
            }
          </View>
          <ScrollView className='mt-2 flex flex-col space-y-2 overflow-y-auto'>
            <KKList data={(searchData && searchData.length > 0) ? searchData : []} navigation={navigation} handleStar={handleStar} handleDelete={handleDelete} />
          </ScrollView>
        </View>
        <StatusBar style='auto' backgroundColor='#3b83f6' />
      </View>
    </View>
  )
}