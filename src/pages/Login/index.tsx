import { IonContent, IonPage } from "@ionic/react"

import LoginForm from "@/components/Forms/Login"

import "./styles.scss"

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className="container">
          <LoginForm />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login
