import { memo } from "react"

import { InputInputEventDetail, IonInputCustomEvent } from "@ionic/core"
import { IonInput } from "@ionic/react"

import { useInputPasswordStore } from "@/store/InputPasswordStore"

import { validations } from "@/utils"

const InputPassword: React.FC = () => {
  const {
    password,
    passwordIsValid,
    passwordIsTouched,
    setPassword,
    setPasswordIsValid,
    setPasswordIsTouched
  } = useInputPasswordStore()

  const handleInputPassword = (
    event: IonInputCustomEvent<InputInputEventDetail>
  ) => {
    const value = event.detail.value!

    setPassword(value)
    const isValid = validations.validatePassword(value)
    setPasswordIsValid(isValid)
  }

  return (
    <IonInput
      className={`${passwordIsTouched && "ion-valid"} ${
        passwordIsValid === false && "ion-invalid"
      } ${passwordIsTouched && "ion-touched"}`}
      fill="solid"
      label="Senha:"
      labelPlacement="floating"
      type="password"
      placeholder="******"
      errorText="Formato de senha inválida"
      minlength={6}
      value={password}
      name="password"
      autocomplete="current-password"
      required
      onIonInput={handleInputPassword}
      onIonBlur={() => setPasswordIsTouched(!passwordIsTouched)}
    />
  )
}

export default memo(InputPassword)
