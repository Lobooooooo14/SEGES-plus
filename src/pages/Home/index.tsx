import { useEffect } from "react"

import { App } from "@capacitor/app"

import { menuController } from "@ionic/core/components"
import {
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from "@ionic/react"
import {
  exitSharp,
  informationCircleSharp,
  settingsSharp
} from "ionicons/icons"

import "./styles.scss"

const Home: React.FC = () => {
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

  const goTo = async (path: string) => {
    await menuController.close("menu").then(() => router.push(path))
  }

  return (
    <>
      <IonMenu menuId="menu" contentId="main-content">
        <IonContent>
          <IonList className="transparent-list" lines="full">
            <IonItem button disabled onClick={() => goTo("/settings")}>
              <IonIcon icon={settingsSharp} slot="start" />
              <IonLabel>Configurações</IonLabel>
            </IonItem>
            <IonItem button onClick={() => goTo("/about")}>
              <IonIcon icon={informationCircleSharp} slot="start" />
              <IonLabel>Sobre</IonLabel>
            </IonItem>
            <IonItem button disabled onClick={() => {}}>
              <IonIcon color="danger" icon={exitSharp} slot="start" />
              <IonLabel color="danger">Sair</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>SEGES+</IonTitle>
        </IonToolbar>
        <IonContent
          fullscreen
          scrollY={false}
          className="ion-padding"
        ></IonContent>
      </IonPage>
    </>
  )
}

export default Home
