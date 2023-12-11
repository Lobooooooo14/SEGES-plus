import * as cheerio from "cheerio"
import { handleTitle } from "../utils/handles"

export const loginDivExists = (html: string): boolean => {
  const $ = cheerio.load(html)
  const loginDiv = $("div#login")

  return loginDiv.length ? true : false
}

export const extractStudentInfo = (
  html: string
): {
  name: string
  birthDate: string
  registration: string
  stage: string
  status: string
  class: string
  shift: string
  number: string
} => {
  const $ = cheerio.load(html)

  const name = $("#formulario\\:nome").val() as string
  const birthDate = $("#formulario\\:dtNascimento").val() as string
  const registration = $("#formulario\\:codMatricula").val() as string
  const stage = $("#formulario\\:nivel").val() as string
  const status = $("#formulario\\:status").val() as string
  const _class = $("#formulario\\:turma").val() as string
  const shift = $("#formulario\\:turno").val() as string
  const number = $("#formulario\\:numero").val() as string

  return {
    name: handleTitle(name),
    birthDate,
    registration,
    stage,
    status,
    class: _class,
    shift,
    number
  }
}
