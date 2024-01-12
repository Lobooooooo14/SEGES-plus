import { createContext } from "react"

import { Seges } from "@/classes"

const segesContext = createContext<Seges>(new Seges())

export default segesContext
