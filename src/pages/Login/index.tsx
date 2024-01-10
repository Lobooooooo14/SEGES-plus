import { useState } from "react"
import { Link } from "react-router-dom"

import { InputInputEventDetail, IonInputCustomEvent } from "@ionic/core"
import {
  IonBadge,
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonText,
  IonToast,
  useIonLoading,
  useIonRouter
} from "@ionic/react"
import { useMaskito } from "@maskito/react"

import { Seges } from "@/classes"
import { validations, handles } from "@/utils"

import "./style.css"

// TODO: remake without class
const SEGES = new Seges()

const Login: React.FC = () => {
  const router = useIonRouter()

  const [cpf, setCpf] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [CPFIsTouched, setCPFIsTouched] = useState<boolean>(false)
  const [CPFIsValid, setCPFIsValid] = useState<boolean>(false)

  const [passwordIsTouched, setPasswordIsTouched] = useState<boolean>(false)
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false)

  const [present, dismiss] = useIonLoading()
  const [loading, setLoading] = useState<boolean>(false)

  const [toast, setToast] = useState<{
    isOpen: boolean
    message: string
  }>({
    isOpen: false,
    message: ""
  })

  const CPFMask = useMaskito({
    options: {
      mask: [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
      ]
    }
  })

  const handleCPF = (event: IonInputCustomEvent<InputInputEventDetail>) => {
    const value = event.detail.value!

    setCpf(value)
    if (value === "") return
    validations.validateCPF(value) ? setCPFIsValid(true) : setCPFIsValid(false)
  }

  const handlePassword = (
    event: IonInputCustomEvent<InputInputEventDetail>
  ) => {
    const value = event.detail.value!

    setPassword(value)
    if (value === "") return

    validations.validatePassword(value)
      ? setPasswordIsValid(true)
      : setPasswordIsValid(false)
  }

  const handleSubmit = () => {
    setLoading(true)
    present({
      message: "Carregando"
    })
    SEGES.login(handles.handleCPF(cpf), password)
      .then(() => {
        setLoading(false)
        dismiss()
        router.push("/home", "root")
      })

      .catch((error) => {
        setToast({
          isOpen: true,
          message: `Erro: ${error}`
        })
        setLoading(false)
        dismiss()
      })
  }

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="container">
          <div className="box">
            <IonText>
              <h1>
                SEGES+ <IonBadge color="warning">Não oficial</IonBadge>
              </h1>
            </IonText>
            <IonInput
              className={`${CPFIsValid && "ion-valid"} ${
                CPFIsValid === false && "ion-invalid"
              } ${CPFIsTouched && "ion-touched"}`}
              fill="solid"
              label="CPF:"
              labelPlacement="floating"
              type="text"
              placeholder="000.000.000-00"
              errorText="CPF inválido"
              value={cpf}
              onIonInput={(e) => handleCPF(e)}
              onIonBlur={() => setCPFIsTouched(true)}
              ref={async (cardRef) => {
                if (cardRef) {
                  const input = await cardRef.getInputElement()
                  CPFMask(input)
                }
              }}
            />

            <IonInput
              className={`${passwordIsValid && "ion-valid"} ${
                passwordIsValid === false && "ion-invalid"
              } ${passwordIsTouched && "ion-touched"}`}
              fill="solid"
              label="Senha:"
              labelPlacement="floating"
              type="password"
              placeholder="******"
              errorText="Formato de senha inválida"
              minlength={6}
              value={password}
              onIonInput={(e) => handlePassword(e)}
              onIonBlur={() => setPasswordIsTouched(true)}
            />
            <IonButton
              disabled={!CPFIsValid || !passwordIsValid || loading}
              onClick={() => handleSubmit()}
            >
              Entrar
            </IonButton>
            <IonToast
              isOpen={toast.isOpen}
              message={toast.message}
              onDidDismiss={() => setToast({ ...toast, isOpen: false })}
              duration={5000}
              color="danger"
            />
            <Link to="/forget-password">Esqueceu sua senha?</Link>
            <p>
              Ao utilizar este aplicativo, você concorda com os{" "}
              <Link to="/terms">termos de serviço</Link> e a{" "}
              <Link to="/privacy">política de privacidade</Link>.
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login
