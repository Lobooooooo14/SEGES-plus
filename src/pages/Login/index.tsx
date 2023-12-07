import { useState } from "react"
import { Link } from "react-router-dom"
import { useMaskito } from "@maskito/react"
import {
  IonBadge,
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonText,
  useIonLoading
} from "@ionic/react"

import { validateCPF, validatePassword } from "../../utils"

import "./style.css"

const Login: React.FC = () => {
  const [cpf, setCpf] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [CPFIsTouched, setCPFIsTouched] = useState<boolean>(false)
  const [CPFIsValid, setCPFIsValid] = useState<boolean>(false)

  const [passwordIsTouched, setPasswordIsTouched] = useState<boolean>(false)
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false)

  const [present, dismiss] = useIonLoading()
  const [loading, setLoading] = useState(false)

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
              onIonInput={(e) => {
                const value = e.detail.value!

                setCpf(value)
                if (value === "") return
                validateCPF(value) ? setCPFIsValid(true) : setCPFIsValid(false)
              }}
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
              onIonInput={(e) => {
                const value = e.detail.value!

                setPassword(value)
                if (value === "") return

                validatePassword(value)
                  ? setPasswordIsValid(true)
                  : setPasswordIsValid(false)
              }}
              onIonBlur={() => setPasswordIsTouched(true)}
            />
            <IonButton
              disabled={!CPFIsValid || !passwordIsValid || loading}
              onClick={() => {
                setLoading(true)
                present({
                  message: "Carregando",
                  duration: 1000
                })

                // TODO: implement login

                setLoading(false)
              }}
            >
              Entrar
            </IonButton>
            <Link to="/forget-password">Esqueceu sua senha?</Link>
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
