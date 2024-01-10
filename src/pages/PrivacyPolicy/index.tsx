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
import TOS from "/PRIVACY_POLICY.md?url"

const PrivacyPolicy: React.FC = () => {
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
        <IonTitle>Política de Privacidade</IonTitle>
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

export default PrivacyPolicy
