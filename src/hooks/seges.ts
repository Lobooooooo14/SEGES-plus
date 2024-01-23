import { Seges } from "@/functions"

export const useSegesLogin = async (
  cpf: string,
  password: string
): Promise<void> => {
  await Seges.auth.login({ cpf, password }, "/inicio.faces")
}

export const useSegesResetPassword = async (cpf: string): Promise<void> => {}
