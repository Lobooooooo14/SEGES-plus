import { Redirect, Route, Switch } from "react-router"

import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"

// import Home from "@/pages/Home"
import Login from "@/pages/Login"
import ResetPassword from "@/pages/ResetPassword"

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/" component={Login} />
        <Switch>
          <Redirect to="/" />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Router
