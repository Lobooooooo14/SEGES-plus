import { useState } from "react"

import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/react"

import { useAppStore } from "@/store/AppStore"

import TosModal from "@/components/TosModal"

import "./styles.scss"

const AcceptTos: React.FC = () => {
  const [isTermsAccepted, setTermsAccepted] = useAppStore((state) => [
    state.isTermsAccepted,
    state.setIsTermsAccepted
  ])

  const [modal, setModal] = useState<{
    open: boolean
    type: "TOS" | "PRIVACY" | null
  }>({
    open: false,
    type: null
  })

  return (
    <>
      <div className="tosBox">
        <IonCheckbox
          labelPlacement="end"
          checked={isTermsAccepted}
          onIonChange={async () => await setTermsAccepted(!isTermsAccepted)}
        />
        <IonLabel>
          {" "}
          Eu estou de acordo com os{" "}
          <span
            className="link"
            onClick={() => setModal({ ...modal, open: true, type: "TOS" })}
          >
            termos de serviço
          </span>{" "}
          e a{" "}
          <span
            className="link"
            onClick={() => setModal({ ...modal, open: true, type: "PRIVACY" })}
          >
            política de privacidade
          </span>
          .
        </IonLabel>
      </div>
      <IonModal isOpen={modal.open}>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setModal({ ...modal, open: false })}>
              Fechar
            </IonButton>
          </IonButtons>

          <IonTitle>
            {modal.type === "TOS"
              ? "Termos de Serviço"
              : "Política de Privacidade"}
          </IonTitle>
        </IonToolbar>
        <TosModal type={modal.type} />
      </IonModal>
    </>
  )
}

export default AcceptTos
