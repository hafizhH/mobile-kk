import { Text, TextInput, View, StatusBar, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../components/Context'
import { useIsFocused } from '@react-navigation/native'
import KKList from '../components/KKList'

export default function Home({ navigation }) {
  const { data, setData, loadDataF, storeDataF } = useContext(Context)
  const [recentData, setRecentData] = useState([])
  const [starredData, setStarredData] = useState([])
  const [tab, setTab] = useState(0)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && loadDataF) {
      loadDataF.func(setData)
    }
  }, [isFocused, loadDataF])

  const handleStar = async (id) => {
    const newData = Array.from(data)
    const idx = newData.findIndex(item => item.id == id)
    if (newData[idx].starredOn)
      newData[idx].starredOn = null
    else
      newData[idx].starredOn = new Date()
    await storeDataF.func(newData, setData)
    navigation.navigate('Home', { refreshTimestamp: Date.now() })
  }

  const handleDelete = async (ids) => {
    // console.log('Delete : ', ids)
    const newData = Array.from(data)
    ids.forEach(id => newData.splice(newData.findIndex(item => item.id == id), 1))
    await storeDataF.func(newData, setData)
    // setData((prev) => { ids.forEach(id => prev.splice(prev.findIndex(item => item.id == id))); return prev })
    navigation.navigate('Home', { refreshTimestamp: Date.now() })
  }

  return (
    <View className='w-full max-h-screen'>
      <View className='w-full h-screen flex flex-col bg-gray-100'>
        <View className='w-full h-24 px-8 flex flex-col bg-blue-500 rounded-b-[35px]'>
          <View className='my-2 flex flex-row'>
            <View className='flex-1 flex flex-col'>
              <Text className='text-gray-50 font-semibold text-lg'>Mobile KK</Text>
              {/* <View className='my-1 flex flex-row'>
                <Image className='w-8 h-8 bg-gray-300' />
                <Text className='mx-2 my-auto text-gray-50'>Anonim</Text>
              </View> */}
            </View>
            {/* <View className='flex flex-col'>
              <Text className='my-auto text-gray-50 text-base'>Dusun Watu</Text>
            </View> */}
          </View>
          <Pressable onPress={() => navigation.navigate('Search')}>
            <View pointerEvents='none'>
              <TextInput className='px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-base' placeholder='Cari No. KK, Kepala Keluarga...'></TextInput>
            </View>
          </Pressable>
        </View>
        <View className='mt-4 mx-4 py-3 flex flex-row divide-x divide-gray-300 rounded-[25px] shadow-lg shadow-gray-600 bg-white'>
          <View className='flex-1 flex flex-col'>
            <Text className='mx-auto text-[48px] text-gray-600'>{ data?.length ?? '' }</Text>
            <Text className='mx-auto text-gray-400 text-md'>Keluarga</Text>
          </View>
          <View className='flex-1 flex flex-col'>
            <Text className='mx-auto text-[48px] text-gray-600'>{ data?.reduce((acc, el) => { acc += el.jumlahAnggota; return acc }, 0) ?? ''}</Text>
            <Text className='mx-auto text-gray-400 text-md'>Jiwa</Text>
          </View>
        </View>
        <View className='mt-4 px-2 flex-1 flex-col bg-white rounded-t-[35px] shadow-lg shadow-gray-600'>
          <View className='mx-4 mt-4 mb-1 flex flex-row space-x-4'>
            <Pressable onPress={() => setTab(0)}><Text className={`px-1 pb-1 font-medium text-gray-600 ${tab == 0 && 'font-semibold text-blue-500 border-b-2 border-b-blue-500'}`}>Terakhir Dilihat</Text></Pressable>
            <Pressable onPress={() => setTab(1)}><Text className={`px-1 pb-1 font-medium text-gray-600 ${tab == 1 && 'font-semibold text-blue-500 border-b-2 border-b-blue-500'}`}>Ditandai</Text></Pressable>
          </View>
          <ScrollView className='flex flex-col overflow-y-auto'>
            {
              (tab == 0) ? 
              <KKList navigation={navigation} data={data?.sort((a,b) => new Date(b.lastModified) - new Date(a.lastModified)).slice(0, 5) ?? null} handleStar={handleStar} handleDelete={handleDelete} emptyMessage={'Belum ada entri'} />
              :
              <KKList navigation={navigation} data={data?.filter(item => (item.starredOn)).sort((a,b) => new Date(b.starredOn) - new Date(a.starredOn)) ?? null} handleStar={handleStar} handleDelete={handleDelete} emptyMessage={'Belum ada entri ditandai'} />
            }
          </ScrollView>
        </View>
        <StatusBar style='auto' backgroundColor='#3b83f6' />
      </View>
      <View className='position-absolute items-end bottom-24 right-4'>
        <TouchableOpacity className='w-40 px-5 py-4 ml-auto flex flex-row space-x-3 bg-blue-500 rounded-full' onPress={() => navigation.navigate('Add')}>
          <FontAwesomeIcon icon={faPlus} style={{ color: '#eeeeee' }} size={20} transform='down-1' />
          <Text className='text-gray-50 font-semibold text-base'>Tambah KK</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}