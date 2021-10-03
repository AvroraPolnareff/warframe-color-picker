import {NextSeo} from "next-seo"
import React from "react"
import {createGlobalStyle} from "styled-components"
import App from "src/components/pages/app/App";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 14px;
  }

  @media (min-width: 1400px) {
    html {
      font-size: 20px;
    }
  }
`

const Index = () => {
  return (
    <>
      <NextSeo
        title="Warframe Color Picker"
        description="I'm your very own Cephalon Cosmetologist from now on, Operator! 😎 Find closest colors | Import colors schemes from screenshots | Share with your friends"
        canonical="https://www.warframecolorpicker.app/"
      />
      <GlobalStyle/>
      <App/>
    </>

  )
}

export default Index
