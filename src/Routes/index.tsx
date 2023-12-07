import { Route } from "react-router"
import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"

import Login from "../pages/Login"
import ForgetPassword from "../pages/ForgetPassword"
import Home from "../pages/Home"

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/" component={Home} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Router
