import React, { createContext, useContext,useState } from 'react'

import useUserDappies from '../hooks/use-user-dappies.hook'
// import useCollection from '../hooks/use-collection.hook'
import useFUSD from '../hooks/use-fusd.hook'
import { useAuth } from './AuthProvider'

const UserContext = createContext()

export default function UserProvider({ children }) {
  const { user } = useAuth()
  // const { collection, createCollection, deleteCollection } = useCollection(user)
  const { data: balance, createFUSDVault, getFUSDBalance } = useFUSD(user)
  const { data: userDappies, addDappy, batchAddDappies, mintDappy } = useUserDappies(user, 
    // collection,
     getFUSDBalance)
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userDappies,
        mintDappy,
        addDappy,
        batchAddDappies,
        isAdmin,
        setIsAdmin,
        // collection,
        // createCollection,
        // deleteCollection,
        balance,
        createFUSDVault,
        getFUSDBalance
      }}>

      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
