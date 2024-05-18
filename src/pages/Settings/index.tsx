import React from "react"

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from "@ionic/react"

const Settings: React.FC = () => {
  const router = useIonRouter()
  return (
    <IonPage>
      {router.canGoBack() && (
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#" />
          </IonButtons>
          <IonTitle>Configurações</IonTitle>
        </IonToolbar>
      )}
      <IonContent fullscreen className="ion-padding"></IonContent>
    </IonPage>
  )
}

export default Settings
