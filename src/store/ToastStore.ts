import { create } from "zustand"

type ToastColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "light"
  | "medium"
  | "dark"

type Toast = {
  isOpen: boolean
  message: string
  color?: ToastColor
}

type ToastStore = {
  toast: Toast
  setToast: (isOpen: boolean, message: string, color?: ToastColor) => void
}

export const useToastStore = create<ToastStore>((set) => {
  return {
    toast: {
      isOpen: false,
      message: "",
      color: "primary"
    },
    setToast: (isOpen: boolean, message: string, color?: ToastColor) =>
      set({ toast: { isOpen, message, color } })
  }
})
