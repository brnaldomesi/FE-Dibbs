import {useContext} from "react"
import {AppContext} from "../contexts/AppContext.js"

export default function useAppContext() {
  return useContext(AppContext)
}
