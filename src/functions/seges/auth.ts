import { CapacitorHttp } from "@capacitor/core"

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
  const cookies = await getCookies()

  // if the session cookie already exists, update the session
  if (cookies.JSESSIONID !== undefined) {
    const responseWithCurrentCookie = await CapacitorHttp.get({
      url: `${segesBaseURL}${endpoint}`,
      headers: {
        Cookie: `JSESSIONID=${cookies.JSESSIONID}`
      }
    })

    if (Scrapping.loginDivExists(responseWithCurrentCookie.data)) {
      await _login(auth, cookies.JSESSIONID, endpoint)
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

    const responseInicioNewCookies = await getCookies()
    await _login(auth, responseInicioNewCookies.JSESSIONID, endpoint)
  }

  const currentCookies = await getCookies()

  const response = await CapacitorHttp.get({
    url: `${segesBaseURL}${endpoint}`,
    headers: {
      cookies: `JSESSIONID=${currentCookies.JSESSIONID}`
    }
  })

  if (
    response.status !== 200 ||
    response.headers["Set-Cookie"] !== undefined ||
    Scrapping.loginDivExists(response.data)
  ) {
    throw new Error("Login failed")
  }

  console.log(response)
  console.log("login success")
}
