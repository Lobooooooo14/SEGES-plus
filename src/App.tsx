import { IonApp, setupIonicReact } from "@ionic/react"

import { Seges } from "@/classes"
import SegesContext from "@/contexts/SegesContext"
import Routes from "@/routes"

setupIonicReact()

const App: React.FC = () => {
  const seges = new Seges()

  return (
    <IonApp>
      <SegesContext.Provider value={seges}>
        <Routes />
      </SegesContext.Provider>
    </IonApp>
  )
}

export default App
