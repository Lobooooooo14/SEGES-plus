import { useEffect } from "react"

import { SplashScreen } from "@capacitor/splash-screen"

import { IonApp, setupIonicReact } from "@ionic/react"

import Toast from "@/components/Toast"
import Routes from "@/routes"

setupIonicReact({ mode: "ios" })

const App: React.FC = () => {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hide()
    }

    hideSplashScreen()
  }, [])
  return (
    <IonApp>
      <Toast />
      <Routes />
    </IonApp>
  )
}

export default App
