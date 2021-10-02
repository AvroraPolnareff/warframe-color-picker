import config from "./next.config"

declare global {
  namespace NodeJS {
    interface ProcessEnv extends config.env {
      NODE_ENV: 'development' | 'production'
      PORT?: string
      PWD: string
      ssrFontSize: number
    }
  }
}
