import { passwordRegex } from "@/constants"

export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, "")

  if (cpf.length !== 11) {
    return false
  }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let remainder = 11 - (sum % 11)
  let digit1 = remainder >= 10 ? 0 : remainder

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = 11 - (sum % 11)
  let digit2 = remainder >= 10 ? 0 : remainder

  return (
    parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2
  )
}

export const validatePassword = (password: string): boolean => {
  return passwordRegex.test(password)
}
