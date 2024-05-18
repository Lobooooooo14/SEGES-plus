import { useEffect, useState } from "react"

import { App } from "@capacitor/app"
import { Browser } from "@capacitor/browser"
import { Capacitor } from "@capacitor/core"

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonImg,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter
} from "@ionic/react"
import { cloudDownloadSharp, heartSharp, logoGithub } from "ionicons/icons"

import TosModal from "@/components/TosModal"
import { appGithubRepoURL, appDonateReadmeURL } from "@/constants"

import "./styles.scss"
import Logo from "/logo.png?url"

const About: React.FC = () => {
  const router = useIonRouter()

  const openInBrowser = async (url: string) => {
    await Browser.open({ url })
  }

  const [modal, setModal] = useState<{
    open: boolean
    type: "TOS" | "PRIVACY" | null
  }>({
    open: false,
    type: null
  })

  const [appVersion, setAppVersion] = useState<string>("Versão desconhecida")

  useEffect(() => {
    const getAppVersion = async (): Promise<void> => {
      if (Capacitor.isNativePlatform()) {
        const appInfo = await App.getInfo()
        setAppVersion(appInfo.version)
      }
    }

    getAppVersion()
  })

  return (
    <IonPage>
      {router.canGoBack() && (
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#" />
          </IonButtons>
          <IonTitle>Sobre</IonTitle>
        </IonToolbar>
      )}
      <IonContent scrollY={false} className="ion-padding">
        <div className="divider">
          <div className="logo-box">
            <IonImg src={Logo} alt="Logo" className="logo" />
            <IonText className="title">
              <h1>SEGES+</h1>
            </IonText>
            <IonText className="version">{appVersion}</IonText>
          </div>

          <div style={{ display: "block" }}>
            <IonButton
              expand="block"
              color="tertiary"
              onClick={() => openInBrowser(appDonateReadmeURL)}
            >
              <IonIcon slot="start" icon={heartSharp} />
              Doar
            </IonButton>
            <IonButton
              expand="block"
              color="light"
              onClick={() => openInBrowser(appGithubRepoURL)}
            >
              <IonIcon slot="start" icon={logoGithub} />
              Código fonte
            </IonButton>
            <IonButton expand="block" color="secondary" disabled>
              <IonIcon slot="start" icon={cloudDownloadSharp} />
              Checar atualizações
            </IonButton>
          </div>
          <IonText className="tos-text">
            <span
              className="link"
              onClick={() => setModal({ ...modal, open: true, type: "TOS" })}
            >
              termos de serviço
            </span>{" "}
            e{" "}
            <span
              className="link"
              onClick={() =>
                setModal({ ...modal, open: true, type: "PRIVACY" })
              }
            >
              política de privacidade
            </span>
          </IonText>
        </div>
      </IonContent>
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
    </IonPage>
  )
}

export default About
