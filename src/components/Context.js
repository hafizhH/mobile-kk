import { createContext, useState, useMemo, useEffect } from 'react';

export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [loadDataF, setLoadDataF] = useState(null)
  const [storeDataF, setStoreDataF] = useState(null)
  
  const value = useMemo(() => ({ data, setData, loadDataF, setLoadDataF, storeDataF, setStoreDataF }), [ data, setData, loadDataF, setLoadDataF, storeDataF, setStoreDataF ])

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}