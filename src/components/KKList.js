import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native"

export default function KKList({ navigation, data, handleStar, handleDelete, emptyMessage }) {
  
  return (
    <>
      {
        (data && data.length > 0) ? data.map((item, index) => {
          return (
            <Pressable key={index} onPress={() => navigation.navigate('View', { item })}>
              <View className='my-1 w-full py-3 px-4 h-24 flex flex-row rounded-2xl border border-gray-200'>
                <Image source={{ uri: item.imageUri || '#' }} className='aspect-[297/210] h-full bg-gray-200 rounded-md' />
                <View className='my-auto mx-4 flex-1 flex flex-col'>
                  <Text className='text-base font-medium text-gray-900'>{ item.nama }</Text>
                  <Text className='text-gray-500 tracking-wider'>{ item.nik }</Text>
                  <Text className='mt-1 text-xs text-gray-300'>Update Terakhir : { new Date(item.lastModified).toLocaleDateString() }</Text>
                </View>
                <View className='mt-2 flex flex-col justify-between'>
                  <TouchableOpacity className='my-auto p-2' onPress={() => { handleStar(item.id) }}>
                    <FontAwesomeIcon icon={faStar} style={{ color: `${ item.starredOn ? '#ffcd3c' : '#bbbbbb' }` }} size={16} />
                  </TouchableOpacity>
                  {/* <TouchableOpacity className='px-2 pt-2' onPress={() => navigation.navigate('Edit', { id: item.id })}>
                    <FontAwesomeIcon icon={faPen} style={{ color: '#bbbbbb' }} size={16} />
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity className='px-1 pb-1' onPress={() => handleDelete([item.id])}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#ee8888' }} size={14} />
                  </TouchableOpacity> */}
                </View>
              </View>
            </Pressable>
          )
        }) :
        <View>
          <Text className='my-6 mx-auto text-md text-gray-300'>{ emptyMessage || '' }</Text>
        </View>
      }
    </>
  )
}