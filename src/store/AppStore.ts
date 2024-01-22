import { create } from "zustand"

import { setStorage, getStorage } from "@/utils/storagePreferences"

type AppStore = {
  isTermsAccepted: boolean
  setIsTermsAccepted: (accepted: boolean) => Promise<void>
}

export const useAppStore = create<AppStore>((set) => {
  const loadSavedState = async (): Promise<void> => {
    const { value } = await getStorage("app", "isTermsAccepted")

    value === "false" || value === null
      ? set({ isTermsAccepted: false })
      : set({ isTermsAccepted: true })
  }

  const setIsTermsAccepted = async (accepted: boolean): Promise<void> => {
    set({ isTermsAccepted: accepted })
    await setStorage("app", { key: "isTermsAccepted", value: accepted })
  }

  loadSavedState()

  return {
    isTermsAccepted: false,
    setIsTermsAccepted
  }
})
