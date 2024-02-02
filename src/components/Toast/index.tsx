import { IonToast } from "@ionic/react"

import { useToastStore } from "@/store/ToastStore"

const Toast: React.FC = () => {
  const { toast, setToast } = useToastStore()

  return (
    <IonToast
      isOpen={toast.isOpen}
      message={toast.message}
      onDidDismiss={() => setToast(false, "")}
      duration={5000}
      color={toast.color || "primary"}
    />
  )
}

export default Toast
