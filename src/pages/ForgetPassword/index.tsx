import { useState } from "react"

import { InputInputEventDetail, IonInputCustomEvent } from "@ionic/core"
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonLoading
} from "@ionic/react"
import { useMaskito } from "@maskito/react"

import { useSegesResetPassword } from "@/hooks/seges"
import { validations } from "@/utils"

const ForgetPassword: React.FC = () => {
  const [cpf, setCpf] = useState("")

  const [CPFIsTouched, setCPFIsTouched] = useState(false)
  const [CPFIsValid, setCPFIsValid] = useState<boolean>(false)

  const [present, dismiss] = useIonLoading()
  const [loading, setLoading] = useState(false)

  const [toast, setToast] = useState<{
    isOpen: boolean
    message: string
  }>({
    isOpen: false,
    message: ""
  })

  const handleCPF = (event: IonInputCustomEvent<InputInputEventDetail>) => {
    const value = event.detail.value!

    setCpf(value)
    if (value === "") return
    validations.validateCPF(value) ? setCPFIsValid(true) : setCPFIsValid(false)
  }

  const handleSubmit = () => {
    setLoading(true)
    present({
      message: "Carregando"
    })

    useSegesResetPassword(cpf)
      .then(() => {
        setLoading(false)
        dismiss()
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
              onIonInput={(e) => handleCPF(e)}
              onIonBlur={() => setCPFIsTouched(true)}
              ref={async (cardRef) => {
                if (cardRef) {
                  const input = await cardRef.getInputElement()
                  CPFMask(input)
                }
              }}
            />
            <IonButton
              disabled={!validations.validateCPF(cpf) || loading}
              onClick={() => handleSubmit()}
            >
              Enviar
            </IonButton>
            <IonToast
              isOpen={toast.isOpen}
              message={toast.message}
              onDidDismiss={() => setToast({ ...toast, isOpen: false })}
              duration={5000}
              color="danger"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ForgetPassword
