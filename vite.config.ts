import legacy from "@vitejs/plugin-legacy"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      public: `${path.resolve(__dirname, "./public/")}`,
      pages: path.resolve(__dirname, "./src/pages/"),
      classes: `${path.resolve(__dirname, "./src/classes/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      theme: `${path.resolve(__dirname, "./src/theme/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
      types: `${path.resolve(__dirname, "./src/@types/")}`
    }
  }
})
