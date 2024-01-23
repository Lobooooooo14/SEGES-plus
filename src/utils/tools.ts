import { emailRegex } from "@/constants"

export const cleanCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, "")
}

// like a Python title function
export const title = (text: string): string => {
  return text
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export const getEmail = (text: string): string => {
  const splited = text.match(emailRegex)

  if (!splited) return text

  const [email] = splited
  return email
}
