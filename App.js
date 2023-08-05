// import { StatusBar } from 'expo-status-bar'
// import 'react-native-get-random-values';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import ViewScreen from './src/screens/ViewScreen'
import AddScreen from './src/screens/AddScreen'
import EditScreen from './src/screens/EditScreen'
import SearchScreen from './src/screens/SearchScreen'
import { AsyncStorage, Text, View } from 'react-native'
import { ContextProvider } from './src/components/Context'
import { Storage } from './src/components/Storage'

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <ContextProvider>
      <Storage>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false, orientation: 'portrait' }} />
            <Stack.Screen name='Search' component={SearchScreen} options={{ title: 'Cari KK', orientation: 'portrait', headerTintColor: '#eeeeee', headerTitleStyle: { color: '#eeeeee' }, headerStyle: { backgroundColor: '#3b83f6' } }} />
            <Stack.Screen name='View' component={ViewScreen} options={({ route }) => ({ headerTitle: (props) => (<View className='flex flex-col'><Text className='text-gray-50 text-lg h-6'>{ route.params.item.nama }</Text><Text className='h-4 text-gray-50 text-xs tracking-wider'>{ route.params.item.nik }</Text></View>), orientation: 'all', headerTintColor: '#eeeeee', headerTitleStyle: { color: '#eeeeee' }, headerStyle: { backgroundColor: '#3b83f6' } })} />
            <Stack.Screen name='Add' component={AddScreen} options={{ title: 'Tambah Scan KK', orientation: 'portrait', headerTintColor: '#eeeeee', headerTitleStyle: { color: '#eeeeee' }, headerStyle: { backgroundColor: '#3b83f6' } }} />
            <Stack.Screen name='Edit' component={EditScreen} options={{ title: 'Perbarui Scan KK', orientation: 'portrait', headerTintColor: '#eeeeee', headerTitleStyle: { color: '#eeeeee' }, headerStyle: { color: '#eeeeee', backgroundColor: '#3b83f6' } }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Storage>
    </ContextProvider>
  )
}