import { Route } from "react-router"

import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import ForgetPassword from "pages/ForgetPassword"
import Home from "pages/Home"
import Login from "pages/Login"
import PrivacyPolicy from "pages/PrivacyPolicy"
import TermsOfService from "pages/TermsOfService"

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/terms" component={TermsOfService} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <Route exact path="/" render={() => <Login />} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Router
