import { useContext, useEffect } from "react";
import { Context } from "./Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Storage = ({ children }) => {
  const { data, setData, loadDataF, setLoadDataF, storeDataF, setStoreDataF } = useContext(Context)

  useEffect(() => {
    setLoadDataF({ func: loadData })
    setStoreDataF({ func: storeData })
  }, [])

  // useEffect(() => {
  //   // storeData(data)
  //   console.log(data)
  // }, [data])

  // const dummyData = [{
  //   id: 0,
  //   nama: 'Wahyudi',
  //   nik: '217999999999',
  //   jumlahAnggota: 3,
  //   lastModified: new Date(),
  //   dateStarred: null
  // }]

  const loadData = async (cb) => {
    try {
      const rawStorageData = await AsyncStorage.getItem('data')
      const storageData = JSON.parse(rawStorageData)
      // setData(dummyData)
      // console.log('Load : ', storageData)
      if (storageData) {
        cb(storageData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const storeData = async (data, cb) => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(data))
      // console.log('Store : '+ JSON.stringify(data))
      loadData(cb)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>{ children }</>
  )
}
