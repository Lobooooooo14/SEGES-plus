import { GetResult, Preferences } from "@capacitor/preferences"

export const setStorage = async (
  group: string = "app",
  data: { key: string; value: any }
): Promise<void> => {
  await Preferences.configure({ group })

  const value = JSON.stringify(data.value)
  await Preferences.set({ key: data.key, value })
}

export const getStorage = async (
  group: string = "app",
  key: string
): Promise<GetResult> => {
  await Preferences.configure({ group })
  return await Preferences.get({ key })
}
