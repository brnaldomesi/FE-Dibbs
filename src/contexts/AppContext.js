import React from "react";
import * as fcl from "@onflow/fcl"
// import { useRouter } from "next/router"
import { useHistory } from "react-router";
import PropTypes from "prop-types"
import { createContext, useCallback, useEffect, useState } from "react"
// import { LOGGED_IN_ADMIN_ADDRESS_KEY } from "src/components/AdminLogInDialog"
// import { isAccountInitialized as isAccountInitializedTx } from "src/flow/script.is-account-initialized"
// import { paths } from "src/global/constants"

export const AppContext = createContext({
  currentUser: null,
  isAccountInitialized: null,
  checkIsAccountInitialized: () => null,
  showAdminLoginDialog: false,
  isLoggedInAsAdmin: () => false,
  logInAdmin: () => null,
  logOutAdmin: () => null,
  flashMessage: null,
  setFlashMessage: _message => null,
  switchToAdminView: () => null,
})

export const AppContextProvider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null)
  const [isAccountInitStateLoading, setIsAccountInitStateLoading] =
    useState(false)
  const [isAccountInitialized, setIsAccountInitialized] = useState(null)
  const [isLoggedInAsAdmin, setIsLoggedInAsAdmin] = useState(false)
  const [showAdminLoginDialog, setShowAdminLoginDialog] = useState(false)
  const [flashMessage, setFlashMessage] = useState(null)


  const checkIsAccountInitialized = useCallback(() => {
    if (currentUser?.addr) {
      setIsAccountInitStateLoading(true)
      // isAccountInitializedTx(currentUser?.addr).then(data => {
      //   setIsAccountInitialized(
      //     data.DibbsItems && data.DibbsItemsMarket
      //   )
      //   setIsAccountInitStateLoading(false)
      // })
    }
  }, [currentUser?.addr])

  useEffect(() => {
    fcl.currentUser().subscribe(newUser => {
      if (newUser?.loggedIn) {
        setCurrentUser(newUser)
        setFlashMessage(null)
      } else {
        setCurrentUser(null)
        // logOutAdmin()
      }
    })
  }, [])

  useEffect(() => {
    checkIsAccountInitialized()
  }, [checkIsAccountInitialized])


  useEffect(() => {
    if (flashMessage !== null) window.scrollTo({ top: 0, behavior: "smooth" })
  }, [flashMessage])

  useEffect(() => {
    setFlashMessage(prev => {
      if (prev !== null) return null
      return prev
    })
  }, [history])

  // const logInAdmin = () => {
  //   localStorage.setItem(
  //     LOGGED_IN_ADMIN_ADDRESS_KEY,
  //     currentUser?.addr
  //   )
  //   history.push(paths.adminMint)
  //   setShowAdminLoginDialog(false)
  //   setIsLoggedInAsAdmin(true)
  // }

  // const logOutAdmin = () => {
  //   localStorage.removeItem(LOGGED_IN_ADMIN_ADDRESS_KEY)
  //   setIsLoggedInAsAdmin(false)
  // }

  const switchToAdminView = () => {
    if (isLoggedInAsAdmin) {
      history.push("/admin/mint")
    } else {
      setShowAdminLoginDialog(true)
    }
  }

  const value = {
    currentUser,
    isAccountInitStateLoading,
    isAccountInitialized,
    checkIsAccountInitialized,
    showAdminLoginDialog,
    setShowAdminLoginDialog,
    isLoggedInAsAdmin,
    switchToAdminView,
    // logInAdmin,
    // logOutAdmin,
    flashMessage,
    setFlashMessage,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
}
