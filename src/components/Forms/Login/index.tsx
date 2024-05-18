import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { App } from "@capacitor/app"

import {
  IonBadge,
  IonButton,
  IonText,
  useIonLoading,
  useIonRouter
} from "@ionic/react"
import { useShallow } from "zustand/react/shallow"

import { useSegesLogin } from "@/hooks/seges"

import { useAppStore } from "@/store/AppStore"
import { useInputCPFStore } from "@/store/InputCPFStore"
import { useInputPasswordStore } from "@/store/InputPasswordStore"
import { useToastStore } from "@/store/ToastStore"
import { useUserStore } from "@/store/UserStore"

import AcceptTos from "@/components/AcceptTos"
import InputCPF from "@/components/Inputs/CPF"
import InputPassword from "@/components/Inputs/Password"

import "./styles.scss"

const LoginForm: React.FC = () => {
  const router = useIonRouter()

  const exitApp = () => {
    if (!router.canGoBack()) {
      App.exitApp()
    }
  }

  useEffect(() => {
    App.addListener("backButton", exitApp)

    return () => {
      App.removeAllListeners()
    }
  }, [])

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
  const [setIsAuthed, setAuth] = useUserStore(
    useShallow((state) => [state.setIsAuthed, state.setAuth])
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
          setIsAuthed(true)
          setAuth({ cpf, password })
          document.removeEventListener("ionBackButton", exitApp)
          router.push("/", "root", "replace")
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
      <IonText className="text-center">
        <h1>
          SEGES+ <IonBadge color="warning">Não oficial</IonBadge>
        </h1>
      </IonText>
      <InputCPF />
      <InputPassword />
      <IonButton disabled={isDisabled()} type="submit">
        Entrar
      </IonButton>
      <Link className="text-center" to="/reset-password">
        Esqueceu sua senha?
      </Link>
      <AcceptTos />
    </form>
  )
}

export default LoginForm
