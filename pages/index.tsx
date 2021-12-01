import App from "../src/components/App";
import {NextSeo} from "next-seo"

const Index = () => {
  const description = !process.env.index ?
    "The app has been moved to a new link: https://www.warframecolorpicker.app/" :
    "Unironically the best and most versatile fashionframe companion out there. Adjust your colors, import schemes from screenshots, share with your friends! Made by Morisabeau & Hippothoe"
  return (
    <>
      <NextSeo
        title="Warframe Color Picker"
        description={description}
        canonical="https://www.warframecolorpicker.app/"
        noindex={!process.env.index}
        nofollow={!process.env.index}
        additionalLinkTags={[
          {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png"},
          {rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5"},
          {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
          {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
          {rel: "manifest", href: "/site.webmanifest"}
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
