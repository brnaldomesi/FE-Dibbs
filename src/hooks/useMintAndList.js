import * as fcl from "@onflow/fcl"
import PropTypes from "prop-types"
import {useState} from "react"
// import publicConfig from "src/global/publicConfig"
import useRequest from "./useRequest"
import useAppContext from "./useAppContext"
export const EVENT_ITEM_MINTED = "DibbsItems.Minted"
export const flashMessages = {
  itemMintedSuccess: {
    type: "notice",
    message: "Dibbs item has been minted!",
  },
  itemMintedError: {
    type: "error",
    message: "Minting has failed. Please try again.",
  },
  loggedOutSuccess: {
    type: "success",
    message: "You have logged out.",
  },
  initializeAccountSuccess: {
    type: "success",
    message: "Your account has been initialized!",
  },
  initializeAccountError: {
    type: "success",
    message: "Your account has not been initialized. Please try again.",
  },
  purchaseSuccess: {
    type: "success",
    message: "Your have purchased this Dibbs Item!",
  },
  purchaseError: {
    type: "error",
    message: "Item purchase has failed. Please try again.",
  },
  itemRemovalSuccess: {
    type: "success",
    message: "Your item has been removed.",
  },
  itemRemovalError: {
    type: "error",
    message: "Your item was not removed. Please try again.",
  },
  itemSaleSuccess: {
    type: "success",
    message: "Your item is now for sale!",
  },
  itemSaleError: {
    type: "error",
    message: "Your item was not listed. Please try again.",
  },
}
const contractDibbsItems = "process.env.NEXT_PUBLIC_CONTRACT_Dibbs_ITEMS"
if (!contractDibbsItems) throw "Missing NEXT_PUBLIC_CONTRACT_Dibbs_ITEMS"


export const getDibbsItemsEventByType = (events, type) => {
  return events.find(
    event =>
      event.type ===
      `A.${fcl.sansPrefix(contractDibbsItems)}.${type}`
  )
}
// Mints an item and lists it for sale. The item is minted on the service account.
export default function useMintAndList(onSuccess) {
  const {setFlashMessage, currentUser} = useAppContext()

  const [_mintState, executeMintRequest] = useRequest()

  const [isMintingLoading, setIsMintingLoading] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState(null)
  const transactionAction = isMintingLoading ? "Minting Item" : "Processing"

  const resetLoading = () => {
    setIsMintingLoading(false)
    setTransactionStatus(null)
  }

  const mintAndList = () => {
    setIsMintingLoading(true)
    const flowAddress = "process.env.NEXT_PUBLIC_FLOW_ADDRESS"
  if (!flowAddress) throw "Missing NEXT_PUBLIC_FLOW_ADDRESS"

    const recipient = flowAddress
    const apiDibbsItemMintAndList =
    "process.env.NEXT_PUBLIC_API_Dibbs_ITEM_MINT_AND_LIST"
    if (!apiDibbsItemMintAndList)
      throw "Missing NEXT_PUBLIC_API_Dibbs_ITEM_MINT_AND_LIST"

    
    // executeMintRequest({
    //   url: apiDibbsItemMintAndList,
    //   method: "POST",
    //   data: {
    //     recipient,
    //   },
    //   onSuccess: async data => {
    //     setIsMintingLoading(true)

    //     const transactionId = data?.transaction
    //     if (!transactionId) throw "Missing transactionId"

    //     const unsub = await fcl
    //       .tx(transactionId)
    //       .subscribe(res => setTransactionStatus(res.status))
    //     const transactionData = await fcl.tx(transactionId).onceSealed()
    //     unsub()

    //     const event = getDibbsItemsEventByType(
    //       transactionData.events,
    //       EVENT_ITEM_MINTED
    //     )

    //     if (!Number.isInteger(event?.data?.id))
    //       throw "Minting error, missing id"
    //     if (!Number.isInteger(event?.data?.kind))
    //       throw "Minting error, missing kind"

    //     onSuccess(event.data.id)
    //   },
    //   onError: () => {
    //     setFlashMessage(flashMessages.itemMintedError)
    //     resetLoading()
    //   },
    // })
  }

  const isLoading = isMintingLoading
  return [{isLoading, transactionAction, transactionStatus}, mintAndList]
}


useMintAndList.propTypes = {
  onSuccess: PropTypes.func,
}
