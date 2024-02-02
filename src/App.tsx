import { IonApp, setupIonicReact } from "@ionic/react"

import Toast from "@/components/Toast"
import Routes from "@/routes"

setupIonicReact()

const App: React.FC = () => {
  return (
    <IonApp>
      <Toast />
      <Routes />
    </IonApp>
  )
}

export default App
