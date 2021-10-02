import Document, {DocumentContext} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import en from "../src/translations/en";
import ru from "../src/translations/ru";
import zh_CN from "../src/translations/zh_CN";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      const resources = {
        en: {translation: en},
        ru: {translation: ru},
        zh_CN: {translation: zh_CN}
      }
      return {
        ...initialProps,
        langResources: resources,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
