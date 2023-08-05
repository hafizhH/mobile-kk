import { Text, TextInput, View, StatusBar, Image, Button, Touchable, TouchableOpacity, ScrollView, Pressable, Dimensions, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../components/Context'
import ImageZoom from 'react-native-image-pan-zoom'

export default function ViewImage({ navigation, route }) {
  const { data, setData, storeDataF } = useContext(Context)

  const [id, setId] = useState('')
  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [jumlahAnggota, setJumlahAnggota] = useState('')
  const [imageUri, setImageUri] = useState(null)

  useEffect(() => {
    if (route.params?.item) {
      // navigation.setParams({ title: route.params.item.nama })
      // const item = data.find(item => item.id == route.params.id)
      const item = route.params.item
      setId(item.id)
      setNama(item.nama)
      setNik(item.nik)
      setJumlahAnggota(item.jumlahAnggota)
      setImageUri(item.imageUri)
    }
  }, [])

  const handleDelete = async (ids) => {  
    Alert.alert('Konfirmasi', 'Yakin Ingin Menghapus entri ini? Data yang telah dihapus tidak dapat dikembalikan',
    [
      {
        text: 'Batal',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Hapus',
        onPress: async () => {
          const newData = Array.from(data)
          ids.forEach(id => newData.splice(newData.findIndex(item => item.id == id), 1))
          await storeDataF.func(newData, setData)
          navigation.navigate('Home', { refreshTimestamp: Date.now() })
        },
        style: 'default',
      },
    ],)
  }

  return (
    <View className='w-full max-h-screen'>
      <View className='w-full h-screen flex flex-col bg-gray-50'>
        <View className='h-full flex flex-col'>
          {/* <View className=''>
            <Text className='text-gray-500'>Nama Kepala Keluarga</Text>
            <TextInput className='py-1 px-1 border-b border-b-gray-300 text-base text-gray-700' placeholder='Nama lengkap...' onChangeText={(text) => { setNama(text) }} defaultValue={nama}></TextInput>
          </View>
          <View className=''>
            <Text className='text-gray-500'>Nomor KK</Text>
            <TextInput className='py-1 px-1 border-b border-b-gray-300 text-base text-gray-700' placeholder='NIK 16 Digit...' onChangeText={(text) => { setNik(text) }} defaultValue={nik}></TextInput>
          </View>
          <View className=''>
            <Text className='text-gray-500'>Jumlah Anggota Keluarga</Text>
            <TextInput className='py-1 px-1 border-b border-b-gray-300 text-base text-gray-700' placeholder='Jumlah anggota keluarga...' onChangeText={(text) => { setJumlahAnggota(text) }} defaultValue={jumlahAnggota}></TextInput>
          </View> */}
          <View className=''>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={350}
                       imageHeight={350}>
              <Image source={{ uri: imageUri }} className='aspect-[297/210]' />
            </ImageZoom>
          </View>
        </View>
        <StatusBar style='auto' backgroundColor='#3b83f6' />
      </View>
      <View className='position-absolute bottom-36 right-6 flex flex-row justify-between'>
        <TouchableOpacity className='w-36 px-6 py-4 ml-auto flex flex-row space-x-3 bg-red-500 rounded-full' onPress={() => handleDelete([id])}>
          <FontAwesomeIcon icon={faTrash} style={{ color: '#eeeeee' }} size={20} transform='down-1' />
          <Text className='text-gray-50 font-semibold text-base'>Hapus</Text>
        </TouchableOpacity>
        <TouchableOpacity className='w-36 px-6 py-4 ml-auto flex flex-row space-x-3 bg-blue-500 rounded-full' onPress={() => navigation.navigate('Edit', { id })}>
          <FontAwesomeIcon icon={faPen} style={{ color: '#eeeeee' }} size={20} transform='down-1' />
          <Text className='text-gray-50 font-semibold text-base'>Perbarui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}