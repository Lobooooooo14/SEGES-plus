export const handleCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, "")
}

export const handleTitle = (text: string): string => {
  return text
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}
