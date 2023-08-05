import { Text, TextInput, View, StatusBar, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Context } from '../components/Context';

export default function Edit({ navigation, route }) {
  const { data, setData, storeDataF } = useContext(Context)

  const [id, setId] = useState('')
  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [jumlahAnggota, setJumlahAnggota] = useState('')
  const [imageUri, setImageUri] = useState(null)

  useEffect(() => {
    if (data != null && route.params.id != null) {
      const item = data.find(item => item.id == route.params.id)
      setId(item.id)
      setNama(item.nama)
      setNik(item.nik)
      setJumlahAnggota(item.jumlahAnggota.toString())
      setImageUri(item.imageUri)
    }
  }, [data, route])

  const checkFields = () => {
    if (!(nama && nik && jumlahAnggota && imageUri)) {
      Alert.alert('Peringatan', 'Data tidak boleh kosong')
      return false
    }
    if (!(jumlahAnggota > 0)) {
      Alert.alert('Peringatan', 'Jumlah anggota KK tidak valid')
      return false
    }
    const check = data.find(item => item.nik == nik)
    if (check && check.id != id) {
      Alert.alert('Peringatan', 'Nomor KK sudah terdaftar')
      return false
    }
    return true
  }

  const handleSubmit = async (id) => {
    if (!checkFields())
      return
    // setData((prev) => {
    //   const idx = prev.findIndex(item => item.id == id)
    //   prev[idx].nama = nama
    //   prev[idx].nik = nik
    //   prev[idx].jumlahAnggota = parseInt(jumlahAnggota)
    //   prev[idx].imageUri = imageUri
    //   prev[idx].lastModified = new Date()
    //   return prev;
    // })
    const newData = Array.from(data)
    const idx = newData.findIndex(item => item.id == id)
    newData[idx].nama = nama
    newData[idx].nik = nik
    newData[idx].jumlahAnggota = parseInt(jumlahAnggota)
    newData[idx].imageUri = imageUri
    newData[idx].lastModified = new Date()
    await storeDataF.func(newData, setData)
    navigation.navigate('Home', { refreshTimestamp: Date.now() })
  }

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

  return (
    <View className='w-full max-h-screen'>
      <View className='w-full h-screen flex flex-col bg-gray-50'>
        <View className='px-6 py-4 flex flex-col space-y-6'>
          <View className=''>
            <Text className='text-gray-500'>Nama Kepala Keluarga</Text>
            <TextInput className='py-1 px-1 border-b border-b-gray-300 text-base text-gray-700' placeholder='Nama lengkap...' onChangeText={(text) => { setNama(text) }} defaultValue={ nama }></TextInput>
          </View>
          <View className=''>
            <Text className='text-gray-500'>Nomor KK</Text>
            <TextInput className='py-1 px-1 border-b border-b-gray-300 text-base text-gray-700' placeholder='NIK 16 Digit...' onChangeText={(text) => { setNik(text) }} keyboardType='numeric' defaultValue={ nik }></TextInput>
          </View>
          <View className=''>
            <Text className='text-gray-500'>Jumlah Anggota Keluarga</Text>
            <TextInput className='py-1 px-1 border-b border-b-gray-300 text-base text-gray-700' placeholder='Jumlah anggota keluarga...' onChangeText={(text) => { setJumlahAnggota(text) }} keyboardType='numeric' defaultValue={ jumlahAnggota }></TextInput>
          </View>
          <Pressable onPress={() => pickImage()}>
            <View className=''>
              <Image source={{ uri: imageUri }} className='aspect-[297/210] w-full bg-gray-200 rounded-lg' />
            </View>
          </Pressable>
        </View>
        <StatusBar style='auto' backgroundColor='#3b83f6' />
      </View>
      <View className='position-absolute bottom-36 right-6 flex flex-row justify-between'>
        <TouchableOpacity className='w-36 px-6 py-4 ml-auto flex flex-row space-x-3 bg-blue-500 rounded-full' onPress={() => handleSubmit(id)}>
          <FontAwesomeIcon icon={faFloppyDisk} style={{ color: '#eeeeee' }} size={20} transform='down-1' />
          <Text className='text-gray-50 font-semibold text-base'>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}