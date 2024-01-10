import { IonContent, IonPage, IonTitle, IonToolbar } from "@ionic/react"

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>SEGES+</IonTitle>
      </IonToolbar>
      <IonContent fullscreen scrollY={false}>
        nada para ver aqui ainda
      </IonContent>
    </IonPage>
  )
}

export default Home
