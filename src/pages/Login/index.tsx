import { useState } from "react"
// import { Link } from "react-router-dom"
import { useMaskito } from "@maskito/react"
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

import { Seges } from "@/classes"
import { validations, handles } from "@/utils"

import "./style.css"

import { InputInputEventDetail, IonInputCustomEvent } from "@ionic/core"

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

  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>("")

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
        setToastMessage(`Erro: ${error}`)
        setToastIsOpen(true)
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
              isOpen={toastIsOpen}
              message={toastMessage}
              onDidDismiss={() => setToastIsOpen(false)}
              duration={5000}
              color="danger"
            />

            {/* <Link to="/forget-password">Esqueceu sua senha?</Link> */}
          </div>
        </div>
      </IonContent>
      <footer>
        <IonText>
          <p>
            Desenvolvido por{" "}
            <a href="https://github.com/lobooooooo14" target="_blank">
              lobooooooo14
            </a>
            .
          </p>
        </IonText>
      </footer>
    </IonPage>
  )
}

export default Login
