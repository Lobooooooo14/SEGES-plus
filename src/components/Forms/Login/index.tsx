import { useCallback, useState } from "react"
import { Link } from "react-router-dom"

import { IonBadge, IonButton, IonText, useIonLoading } from "@ionic/react"
import { useShallow } from "zustand/react/shallow"

import { useSegesLogin } from "@/hooks/seges"

import { useAppStore } from "@/store/AppStore"
import { useInputCPFStore } from "@/store/InputCPFStore"
import { useInputPasswordStore } from "@/store/InputPasswordStore"
import { useToastStore } from "@/store/ToastStore"

import AcceptTos from "@/components/AcceptTos"
import InputCPF from "@/components/Inputs/CPF"
import InputPassword from "@/components/Inputs/Password"

import "./styles.scss"

const LoginForm: React.FC = () => {
  const isTermsAccepted = useAppStore((state) => state.isTermsAccepted)
  const setToast = useToastStore((state) => state.setToast)

  const [cpf, cpfIsValid] = useInputCPFStore(
    useShallow((state) => [state.cpf, state.cpfIsValid, state.cpfIsTouched])
  )
  const [password, passwordIsValid] = useInputPasswordStore(
    useShallow((state) => [
      state.password,
      state.passwordIsValid,
      state.passwordIsTouched
    ])
  )

  const [present, dismiss] = useIonLoading()
  const [isLoading, setisLoading] = useState<boolean>(false)

  const isDisabled = useCallback(() => {
    return !cpfIsValid || !passwordIsValid || isLoading || !isTermsAccepted
  }, [cpfIsValid, passwordIsValid, isLoading, isTermsAccepted])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (isDisabled()) return

      setisLoading(true)
      present({
        message: "Carregando"
      })

      await useSegesLogin(cpf, password)
        .then(() => {
          setisLoading(false)
          dismiss()
          // router.push("/home", "root")
        })

        .catch((error) => {
          setToast(true, `Erro: ${error}`, "danger")
          setisLoading(false)
          dismiss()
        })
    },
    [cpf, password]
  )

  return (
    <form onSubmit={handleSubmit}>
      <IonText>
        <h1>
          SEGES+ <IonBadge color="warning">Não oficial</IonBadge>
        </h1>
      </IonText>
      <InputCPF />
      <InputPassword />
      <IonButton disabled={isDisabled()} type="submit">
        Entrar
      </IonButton>
      <Link to="/reset-password">Esqueceu sua senha?</Link>
      <AcceptTos />
    </form>
  )
}

export default LoginForm
