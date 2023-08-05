import { Text, TextInput, View, StatusBar, Image, Button, Touchable, TouchableOpacity, ScrollView, Pressable, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import uuid from 'react-native-uuid'
// const { v4: uuidv4 } = require('uuid')
// import { WebView } from 'react-native-webview';
import { Context } from '../components/Context'

export default function Add({ navigation }) {
  const { data, setData, storeDataF } = useContext(Context)

  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [jumlahAnggota, setJumlahAnggota] = useState('')
  const [imageUri, setImageUri] = useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
    }
  }

  const checkFields = () => {
    if (!(nama && nik && jumlahAnggota && imageUri)) {
      Alert.alert('Peringatan', 'Data tidak boleh kosong')
      return false
    }
    if (!(jumlahAnggota > 0)) {
      Alert.alert('Peringatan', 'Jumlah anggota KK tidak valid')
      return false
    }
    const tmpData = Array.from(data)
    if (tmpData.find(item => item.nik == nik)) {
      Alert.alert('Peringatan', 'Nomor KK sudah terdaftar')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!checkFields())
      return
    
    let id
    try {
      id = uuid.v4()
    } catch (e) {
      console.log(e)
    }
    const newItem = {
      id,
      nama,
      nik,
      jumlahAnggota: parseInt(jumlahAnggota),
      imageUri,
      lastModified: new Date(),
      starredOn: null
    }
    const newData = Array.from(data)
    newData.push(newItem)
    await storeDataF.func(newData, setData)
    // setData((prev) => { prev.push(newItem); return prev; })
    navigation.navigate('Home', { refreshTimestamp: Date.now() })
  }

  return (
    <View className='w-full max-h-screen'>
      <View className='w-full h-screen flex flex-col bg-gray-50'>
        <View className='px-6 py-4 flex flex-col space-y-6'>
          <View className=''>
            <Text className='text-gray-500'>Nama Kepala Keluarga</Text>
            <TextInput className='py-1 px-1 border-b border-b-gray-300 text-base text-gray-700' placeholder='Nama lengkap...' onChangeText={(text) => { setNama(text) }} defaultValue={nama}></TextInput>
          </View>
          <View className=''>
            <Text className='text-gray-500'>Nomor KK</Text>
            <TextInput className='py-1 px-1 border-b border-b-gray-300 text-base text-gray-700' placeholder='NIK 16 Digit...' keyboardType='numeric' onChangeText={(text) => { setNik(text) }} defaultValue={nik}></TextInput>
          </View>
          <View className=''>
            <Text className='text-gray-500'>Jumlah Anggota Keluarga</Text>
            <TextInput className='py-1 px-1 border-b border-b-gray-300 text-base text-gray-700' placeholder='Jumlah anggota keluarga...' keyboardType='numeric' onChangeText={(text) => { setJumlahAnggota(text) }} defaultValue={jumlahAnggota}></TextInput>
          </View>
          <Pressable onPress={() => pickImage()}>
            <View className=''>
              <Image source={{ uri: imageUri }} className='aspect-[297/210] bg-gray-200 w-full rounded-lg' />
            </View>
          </Pressable>
        </View>
        <StatusBar style='auto' backgroundColor='#3b83f6' />
      </View>
      <View className='position-absolute items-end bottom-36 right-4'>
        <TouchableOpacity className='w-44 px-5 py-4 ml-auto flex flex-row space-x-3 bg-blue-500 rounded-full' onPress={() => handleSubmit()}>
          <FontAwesomeIcon icon={faPlus} style={{ color: '#eeeeee' }} size={20} transform='down-1' />
          <Text className='text-gray-50 font-semibold text-base'>Tambah Entri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}