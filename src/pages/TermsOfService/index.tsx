import { useState } from "react"
import Markdown from "react-markdown"

import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter
} from "@ionic/react"
import { arrowBack } from "ionicons/icons"

import "./styles.scss"
import TOS from "/TERMS_OF_SERVICE.md?url"

const TermsOfService: React.FC = () => {
  const router = useIonRouter()

  const [markdown, setMarkdown] = useState("")

  fetch(TOS)
    .then((response) => response.text())
    .then((text) => {
      setMarkdown(text)
    })

  return (
    <IonPage>
      <IonToolbar>
        {router.canGoBack() && (
          <IonButtons slot="start">
            <IonButton onClick={() => router.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
        )}
        <IonTitle>Termos de Serviço</IonTitle>
      </IonToolbar>
      <IonContent fullscreen scrollY={true} className="ion-padding">
        <div className="markdown-container">
          <IonText>
            <Markdown className="markdown">{markdown}</Markdown>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default TermsOfService
