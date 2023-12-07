import { useState } from "react"
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading
} from "@ionic/react"
import { useMaskito } from "@maskito/react"

import { validateCPF } from "../../utils"

const ForgetPassword: React.FC = () => {
  const [cpf, setCpf] = useState("")

  const [CPFIsTouched, setCPFIsTouched] = useState(false)
  const [CPFIsValid, setCPFIsValid] = useState<boolean>(false)

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
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="#" />
        </IonButtons>
        <IonTitle>Recuperação de senha</IonTitle>
      </IonToolbar>
      <IonContent fullscreen scrollY={false}>
        <div className="container">
          <div className="box">
            <IonText>
              <h1>Recuperação de senha</h1>
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
            <IonButton
              disabled={!validateCPF(cpf) || loading}
              onClick={() => {
                setLoading(true)
                present({
                  message: "Carregando",
                  duration: 1000
                })

                // TODO: implement forget password

                setLoading(false)
              }}
            >
              Enviar
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ForgetPassword
