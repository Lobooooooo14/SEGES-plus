import { CapacitorCookies } from "@capacitor/core"

export const getCookies = async (): Promise<{ [key: string]: string }> => {
  return await CapacitorCookies.getCookies()
}
