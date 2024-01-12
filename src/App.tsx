import { IonApp, setupIonicReact } from "@ionic/react"

import { Seges } from "@/classes"
import segesContext from "@/contexts/segesContext"
import Routes from "@/routes"

setupIonicReact()

const App: React.FC = () => {
  const seges = new Seges()

  return (
    <IonApp>
      <segesContext.Provider value={seges}>
        <Routes />
      </segesContext.Provider>
    </IonApp>
  )
}

export default App
