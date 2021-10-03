import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import en from "locales/en/translation.json";
import ru from "locales/ru/translation.json";
import zh_CN from "locales/zh_CN/translation.json";
import {NextSeo} from "next-seo"

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

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}
