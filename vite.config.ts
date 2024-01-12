import legacy from "@vitejs/plugin-legacy"
import react from "@vitejs/plugin-react"
import * as path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/")
    }
  }
})
