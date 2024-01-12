import { CapacitorCookies, CapacitorHttp, HttpResponse } from "@capacitor/core"

import { loginDivExists } from "@/utils/scrapping"

class Seges {
  private baseUrl: string

  constructor() {
    this.baseUrl = "https://segespais.caedufjf.net/seges"
  }

  async getJSessionIdCookie(): Promise<string | undefined> {
    const cookies = await CapacitorCookies.getCookies()
    return cookies.JSESSIONID
  }

  async isLogged(): Promise<boolean> {
    const JSESSIONID = await this.getJSessionIdCookie()

    const response: HttpResponse = await CapacitorHttp.get({
      url: `${this.baseUrl}/selecaoPerfil.faces`,
      headers: {
        Cookie: JSESSIONID !== undefined ? JSESSIONID : ""
      }
    })

    if (loginDivExists(response.data)) {
      console.log("Not logged in. JSESSIONID was defined")
      return false
    } else {
      console.log("Logged in")
      return true
    }
  }

  async login(CPF: string, password: string): Promise<void> {
    let JSESSIONID = await this.getJSessionIdCookie()

    if (!(await this.isLogged())) {
      if (JSESSIONID === undefined) {
        console.log("JSESSIONID not found, requesting Set-Cookie header...")
        await CapacitorHttp.get({
          url: `${this.baseUrl}/login.faces`
        })

        JSESSIONID = await this.getJSessionIdCookie()

        if (JSESSIONID === undefined) {
          console.error("JSESSIONID not found, Set-Cookie header not found")
          throw new Error("JSESSIONID not found")
        }
      }
    }

    const response: HttpResponse = await CapacitorHttp.post({
      url: `${this.baseUrl}/login.faces`,
      headers: {
        Cookie: JSESSIONID !== undefined ? JSESSIONID : ""
      },
      params: {
        formulario: "formulario",
        "formulario:login": CPF,
        "formulario:senha": password,
        "formulario:logar": "",
        "javax.faces.ViewState": "j_id1"
      }
    })

    if (response.status === 302) {
      console.log("Login successful")
    } else {
      console.error("Login failed")
      throw new Error("Login failed")
    }
  }
}

export default Seges
