import { create } from "zustand"

type passwordState = {
  password: string
  passwordIsValid: boolean
  passwordIsTouched: boolean
  setPassword: (password: string) => void
  setPasswordIsTouched: (isTouched: boolean) => void
  setPasswordIsValid: (isValid: boolean) => void
}

export const useInputPasswordStore = create<passwordState>((set) => {
  return {
    password: "",
    passwordIsValid: false,
    passwordIsTouched: false,
    setPassword: (password: string) => set({ password }),
    setPasswordIsTouched: (isTouched: boolean) =>
      set({ passwordIsTouched: isTouched }),
    setPasswordIsValid: (isValid: boolean) => set({ passwordIsValid: isValid })
  }
})
