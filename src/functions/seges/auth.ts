import { CapacitorHttp } from "@capacitor/core"

import { useUserStore } from "@/store/UserStore"

import { segesBaseURL } from "@/constants"
import { Scrapping } from "@/functions"
import { tools } from "@/utils"

import { getCookies } from "./cookies"

const _login = async (
  auth: {
    cpf: string
    password: string
  },
  cookie: string,
  endpoint: string
): Promise<void> => {
  const cleanedCPF = tools.cleanCPF(auth.cpf)

  const response = await CapacitorHttp.post({
    url: `${segesBaseURL}/login.faces;jsessionid=${cookie}`,
    headers: {
      cookies: `JSESSIONID=${cookie}`
    },
    params: {
      formulario: "formulario",
      "formulario:login": cleanedCPF,
      "formulario:senha": auth.password,
      "formulario:logar": "",
      "javax.faces.ViewState": "j_id1"
    }
  })

  if (
    !(
      response.status === 302 &&
      response.headers["Location"] ===
        `http://segespais.caedufjf.net/seges${endpoint}`
    )
  ) {
    throw new Error(
      `Login failed: login response status is not 302 and not redirect to ${endpoint}`
    )
  }
}

export const login = async (
  auth: { cpf: string; password: string },
  endpoint: string
): Promise<void> => {
  const currentCookies = await getCookies()

  // if the session cookie already exists, refresh the session
  if (currentCookies.JSESSIONID !== undefined) {
    const responseWithCurrentCookie = await CapacitorHttp.get({
      url: `${segesBaseURL}${endpoint}`,
      headers: {
        Cookie: `JSESSIONID=${currentCookies.JSESSIONID}`
      }
    })

    if (Scrapping.loginDivExists(responseWithCurrentCookie.data)) {
      await _login(auth, currentCookies.JSESSIONID, endpoint)
    }
  }

  // if not, get a new session cookie and login to validate it
  else {
    const responseNewCookie = await CapacitorHttp.get({
      url: `${segesBaseURL}${endpoint}`
    })

    if (responseNewCookie.headers["Set-Cookie"] === undefined) {
      throw new Error("Login failed: JSESSIONID not found in Set-Cookie header")
    }

    const newCookies = await getCookies()
    await _login(auth, newCookies.JSESSIONID, endpoint)
  }

  const cookies = await getCookies()

  const response = await CapacitorHttp.get({
    url: `${segesBaseURL}${endpoint}`,
    headers: {
      cookies: `JSESSIONID=${cookies.JSESSIONID}`
    }
  })

  if (
    response.status !== 200 ||
    response.headers["Set-Cookie"] !== undefined ||
    Scrapping.loginDivExists(response.data)
  ) {
    throw new Error("Login failed")
  }

  const finalCookies = await getCookies()
  useUserStore.getState().auth.jsSessionId = finalCookies.JSESSIONID
  console.log("login success")
}

export const isLogged = async (): Promise<boolean> => {
  const currentCookies = await getCookies()

  if (currentCookies.JSESSIONID !== undefined) {
    const responseWithCurrentCookie = await CapacitorHttp.get({
      url: `${segesBaseURL}/inicio.faces`,
      readTimeout: 10000,
      headers: {
        Cookie: `JSESSIONID=${currentCookies.JSESSIONID}`
      }
    })

    if (!Scrapping.loginDivExists(responseWithCurrentCookie.data)) {
      return true
    }
  }

  const finalCookies = await getCookies()
  useUserStore.setState((state) => ({
    ...state,
    auth: { ...state.auth, jsSessionId: finalCookies.JSESSIONID }
  }))
  return false
}
