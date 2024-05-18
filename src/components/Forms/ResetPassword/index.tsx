import { useCallback, useState } from "react"

import { IonButton, IonText, useIonLoading } from "@ionic/react"
import { useShallow } from "zustand/react/shallow"

import { useSegesResetPassword } from "@/hooks/seges"

import { useInputCPFStore } from "@/store/InputCPFStore"
import { useToastStore } from "@/store/ToastStore"

import InputCPF from "@/components/Inputs/CPF"

import "./styles.scss"

const ResetPasswordForm: React.FC = () => {
  const setToast = useToastStore((state) => state.setToast)

  const [cpf, cpfIsValid] = useInputCPFStore(
    useShallow((state) => [state.cpf, state.cpfIsValid, state.cpfIsTouched])
  )

  const [present, dismiss] = useIonLoading()
  const [isLoading, setisLoading] = useState<boolean>(false)

  const isDisabled = useCallback(() => {
    return !cpfIsValid || isLoading
  }, [cpfIsValid, isLoading])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (isDisabled()) return

      setisLoading(true)
      present({
        message: "Carregando"
      })

      await useSegesResetPassword(cpf).catch((error) => {
        setToast(true, `Erro: ${error}`, "danger")
        setisLoading(false)
        dismiss()
      })
    },
    [cpf]
  )

  return (
    <form onSubmit={handleSubmit}>
      <IonText className="text-center">
        <h1>Recuperação de senha</h1>
      </IonText>
      <InputCPF />
      <IonButton disabled={isDisabled()} type="submit">
        Enviar
      </IonButton>
    </form>
  )
}

export default ResetPasswordForm
