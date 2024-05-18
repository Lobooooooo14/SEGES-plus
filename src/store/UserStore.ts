import { create } from "zustand"

import { setStorage } from "@/utils/storagePreferences"

type Auth = {
  cpf: string
  password: string
  jsSessionId?: string
}

type UserStore = {
  isAuthed: boolean
  auth: Auth
  setIsAuthed: (authed: boolean) => void
  setAuth: (auth: Auth) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => {
  const setAuth = async (auth: Auth) => {
    set({ auth })
    await setStorage("user", { key: "auth", value: auth })
  }
  return {
    isAuthed: false,
    auth: { cpf: "", password: "", jsSessionId: "" },
    setIsAuthed: (authed: boolean) => set({ isAuthed: authed }),
    setAuth
  }
})
