import { Redirect, Route, Switch } from "react-router"

import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"

import { useUserStore } from "@/store/UserStore"

import Home from "@/pages/Home"
import Login from "@/pages/Login"
import ResetPassword from "@/pages/ResetPassword"
import Settings from "@/pages/Settings"

import About from "./pages/About"

const Router: React.FC = () => {
  const [isAuthed] = useUserStore((state) => [state.isAuthed])

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route
          exact
          path="/"
          render={() => (isAuthed ? <Home /> : <Redirect to="/login" />)}
        />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/reset-password" render={() => <ResetPassword />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Switch>
          <Redirect to="/" />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Router
