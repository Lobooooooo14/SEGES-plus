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
  endpoint: string = "/inicio.faces"
): Promise<void> => {
  const cleanedCPF = tools.cleanCPF(auth.cpf)

  const responseLogin = await CapacitorHttp.post({
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
      responseLogin.status === 302 &&
      responseLogin.headers["Location"] ===
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
  endpoint: string = "/inicio.faces"
): Promise<void> => {
  const cookies = await getCookies()

  if (cookies.JSESSIONID !== undefined) {
    const responseInicioCookie = await CapacitorHttp.get({
      url: `${segesBaseURL}${endpoint}`,
      headers: {
        Cookie: `JSESSIONID=${cookies.JSESSIONID}`
      }
    })

    if (Scrapping.loginDivExists(responseInicioCookie.data)) {
      await _login(auth, cookies.JSESSIONID)
    }
  } else {
    const responseInicioNewCookie = await CapacitorHttp.get({
      url: `${segesBaseURL}${endpoint}`
    })

    if (responseInicioNewCookie.headers["Set-Cookie"] === undefined) {
      throw new Error("Login failed: JSESSIONID not found in Set-Cookie header")
    }

    const responseInicioNewCookies = await getCookies()
    await _login(auth, responseInicioNewCookies.JSESSIONID)
  }

  const currentCookies = await getCookies()

  const responseInicio = await CapacitorHttp.get({
    url: `${segesBaseURL}${endpoint}`,
    headers: {
      cookies: `JSESSIONID=${currentCookies.JSESSIONID}`
    }
  })

  if (
    responseInicio.status !== 200 ||
    responseInicio.headers["Set-Cookie"] !== undefined ||
    responseInicio.data.includes("Login")
  ) {
    throw new Error("Login failed")
  }

  console.log(responseInicio)
  console.log("login success")
}
