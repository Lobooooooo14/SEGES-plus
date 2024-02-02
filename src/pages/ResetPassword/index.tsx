import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react"

import ResetPasswordForm from "@/components/Forms/ResetPassword"

const ForgetPassword: React.FC = () => {
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/login" />
        </IonButtons>
        <IonTitle>Recuperação de senha</IonTitle>
      </IonToolbar>
      <IonContent fullscreen scrollY={false}>
        <div className="container">
          <ResetPasswordForm />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ForgetPassword
