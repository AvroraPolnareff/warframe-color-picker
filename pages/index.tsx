import App from "../src/components/App";
import {NextSeo} from "next-seo"

const Index = () => {
  return (
    <>
      <NextSeo
        title="Warframe Color Picker"
        description="I'm your very own Cephalon Cosmetologist from now on, Operator! 😎 Find closest colors | Import colors schemes from screenshots | Share with your friends"
        canonical="https://www.warframecolorpicker.app/"
        // additionalMetaTags={[
        //   {name: "theme-color", content: "#ffffff"}
        // ]}
        additionalLinkTags={[
          {rel: "manifest", href: "/manifest.json"},
          {rel:"shortcut icon", href: "/favicon.ico", type:"image/x-icon"}
        ]}
        additionalMetaTags={[
          {name: "yandex-verification", content: "b316278f5276b429"}
        ]}
      />
      <App/>
    </>

  )
}

export default Index
