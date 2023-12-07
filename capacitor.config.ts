import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.lobo.segesplus",
  appName: "SEGES+",
  webDir: "dist",
  server: {
    androidScheme: "https"
  },
  android: {
    buildOptions: {
      signingType: "jarsigner"
    }
  }
}

export default config
