import App from "../src/components/App";
import {NextSeo} from "next-seo"

const Index = () => {
  return (
    <>
      <NextSeo
        title="Warframe Color Picker"
        description="I'm your very own Cephalon Cosmetologist from now on, Operator! 😎 Find closest colors | Import colors schemes from screenshots | Share with your friends"
        canonical="https://www.warframecolorpicker.app/"
        noindex={!!process.env.NO_INDEX}
        nofollow={!!process.env.NO_INDEX}
        additionalLinkTags={[
          {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png"},
          {rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5"},
          {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
          {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
          {rel: "manifest", href: "/site.webmanifest"},
          {rel:"shortcut icon", href: "/favicon.ico", type:"image/x-icon"}
        ]}
        additionalMetaTags={[
          {name: "msapplication-TileColor", content: "#5bbad5"},
          {name: "theme-color", content: "#000000"},
          {name: "yandex-verification", content: "b316278f5276b429"}
        ]}
      />
      <App/>
    </>

  )
}

export default Index
