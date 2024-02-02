import { create } from "zustand"

type CpfStore = {
  cpf: string
  cpfIsValid: boolean
  cpfIsTouched: boolean
  setCPF: (cpf: string) => void
  setCPFIsTouched: (isTouched: boolean) => void
  setCPFIsValid: (isValid: boolean) => void
}

export const useInputCPFStore = create<CpfStore>((set) => {
  return {
    cpf: "",
    cpfIsValid: false,
    cpfIsTouched: false,
    setCPF: (cpf: string) => set({ cpf }),
    setCPFIsTouched: (isTouched: boolean) => set({ cpfIsTouched: isTouched }),
    setCPFIsValid: (isValid: boolean) => set({ cpfIsValid: isValid })
  }
})
