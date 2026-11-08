import { defineConfig } from "@playwright/test"

const devServer = process.env.PLAYWRIGHT_DEV_SERVER === "1"
const port = devServer ? 4174 : 4173

export default defineConfig({
  use: {
    baseURL: `http://localhost:${port}`,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    },
  },
  webServer: {
    command: devServer
      ? `npm run dev -- --port ${port} --strictPort`
      : "npm run build && npm run preview",
    port,
  },
  testMatch: "**/*.e2e.{ts,js}",
})
