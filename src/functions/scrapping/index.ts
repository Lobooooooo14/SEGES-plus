import * as cheerio from "cheerio"

import { tools } from "@/utils"

type StudantInfo = {
  name: string
  birthDate: string
  registration: string
  stage: string
  status: string
  class: string
  shift: string
  number: string
}

export const loginDivExists = (html: string): boolean => {
  const $ = cheerio.load(html)
  const loginDiv = $("div#login")

  return loginDiv.length ? true : false
}

export const extractStudentInfo = (html: string): StudantInfo => {
  const $ = cheerio.load(html)

  const selectors: { [key: string]: string } = {
    name: "#formulario\\:nome",
    birthDate: "#formulario\\:dtNascimento",
    registration: "#formulario\\:codMatricula",
    stage: "#formulario\\:nivel",
    status: "#formulario\\:status",
    class: "#formulario\\:turma",
    shift: "#formulario\\:turno",
    number: "#formulario\\:numero"
  }

  const extractedInfo: { [key: string]: string } = {}

  Object.keys(selectors).forEach((key) => {
    const selector = selectors[key]
    const value = $(selector).text().trim()
    extractedInfo[key] = value
  })

  return {
    name: tools.title(extractedInfo.name),
    birthDate: extractedInfo.birthDate,
    registration: extractedInfo.registration,
    stage: extractedInfo.stage,
    status: extractedInfo.status,
    class: extractedInfo.class,
    shift: extractedInfo.shift,
    number: extractedInfo.number
  }
}

export const forgetPasswordModalIsOpen = (html: string): boolean => {
  const $ = cheerio.load(html)

  const div = $("#panelStatusContainer")
  const displayValue = div.css("display")

  return displayValue === "none" ? false : true
}

export const forgetPasswordGetModalText = (html: string): string => {
  const $ = cheerio.load(html)
  return $(".alturaTotal td:nth-child(2)").text().trim()
}
