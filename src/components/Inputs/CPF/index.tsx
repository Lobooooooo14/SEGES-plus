import { memo, useCallback } from "react"

import { InputInputEventDetail, IonInputCustomEvent } from "@ionic/core"
import { IonInput } from "@ionic/react"
import { useMaskito } from "@maskito/react"

import { useInputCPFStore } from "@/store/InputCPFStore"

import { validations } from "@/utils"

const InputCPF: React.FC = () => {
  const {
    cpf,
    cpfIsValid,
    cpfIsTouched,
    setCPF,
    setCPFIsValid,
    setCPFIsTouched
  } = useInputCPFStore()

  const CPFMask = useMaskito({
    options: {
      mask: [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
      ]
    }
  })

  const handleInputCPF = useCallback(
    (event: IonInputCustomEvent<InputInputEventDetail>) => {
      const value = event.detail.value!

      setCPF(value)
      const isValid = validations.validateCPF(value)
      setCPFIsValid(isValid)
    },
    [cpf]
  )

  return (
    <IonInput
      className={`${cpfIsValid && "ion-valid"} ${
        cpfIsValid === false && "ion-invalid"
      } ${cpfIsTouched && "ion-touched"}`}
      fill="solid"
      label="CPF:"
      labelPlacement="floating"
      type="text"
      placeholder="000.000.000-00"
      errorText="CPF inválido"
      value={cpf}
      name="cpf"
      autocomplete="username"
      required
      onIonInput={(e) => handleInputCPF(e)}
      onIonBlur={() => setCPFIsTouched(!cpfIsTouched)}
      ref={async (cardRef) => {
        if (cardRef) {
          const input = await cardRef.getInputElement()
          CPFMask(input)
        }
      }}
    />
  )
}

export default memo(InputCPF)
