import { useEffect, useState } from "react"
import Markdown from "react-markdown"

import {
  IonContent,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonText,
  RefresherEventDetail
} from "@ionic/react"

import { TosUrl, PrivacyUrl } from "@/constants"

import "./styles.scss"

const TosModal: React.FC<{ type: "TOS" | "PRIVACY" | null }> = ({ type }) => {
  const [markdown, setMarkdown] = useState<string>(
    `Ops! Algo deu muito errado. Visite os [termos de serviços](${TosUrl.github}) e a [política de privacidade](${PrivacyUrl.github}) no repositório do projeto.`
  )
  const [loading, setLoading] = useState<boolean>(true)

  const handleFetchMarkdown = async () => {
    if (!type) return

    const response = await fetch(type === "TOS" ? TosUrl.raw : PrivacyUrl.raw)

    if (!response.ok) {
      setLoading(false)
      return
    }

    const data = await response.text()

    setMarkdown(data)
    setLoading(false)
  }

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    handleFetchMarkdown().then(() => event.detail.complete())
  }

  useEffect(() => {
    handleFetchMarkdown()
  }, [])

  return (
    <IonContent fullscreen scrollY={true} className="ion-padding">
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>
      <IonLoading isOpen={loading} message="Obtendo dados" />
      <div className="markdown-container">
        <IonText>
          <Markdown className="markdown">{markdown}</Markdown>
        </IonText>
      </div>
    </IonContent>
  )
}

export default TosModal
