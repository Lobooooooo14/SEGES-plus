import { Route } from "react-router"
import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"

import Login from "../pages/Login"
import ForgetPassword from "../pages/ForgetPassword"
import Home from "../pages/Home"

import { Seges } from "../classes"
const SEGES = new Seges()

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/" render={() => <Login />} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Router
