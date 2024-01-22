import { Redirect, Route, Switch } from "react-router"

import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"

import ForgetPassword from "@/pages/ForgetPassword"
import Home from "@/pages/Home"
import Login from "@/pages/Login"

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/" render={() => <Home />} />
        <Switch>
          <Redirect to="/" />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Router
