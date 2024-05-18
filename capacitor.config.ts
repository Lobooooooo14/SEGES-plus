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
      signingType: "apksigner"
    }
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    CapacitorCookies: {
      enabled: true
    },
    SplashScreen: {
      launchAutoHide: false,
      launchFadeOutDuration: 300,
      androidScaleType: "CENTER_CROP"
    }
  }
}

export default config
