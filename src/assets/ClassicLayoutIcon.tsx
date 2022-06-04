import {useTheme} from "styled-components";

export const ClassicLayoutIcon = () => {
  const {colors} = useTheme()
  return (
      <svg width="163" height="162" viewBox="0 0 163 162" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.389526" width="162" height="162" rx="20" className="svg-fill" fill={colors.buttons} style={{transition: "fill 0.5s ease"}}/>
          <rect x="18.3423" y="22.2503" width="43.1099" height="57.7116" rx="5" fill="white"/>
          <rect x="67.0147" y="15.9924" width="39.6333" height="48.6724" rx="5" fill="white"/>
          <rect x="67.0147" y="69.532" width="39.6333" height="76.4852" rx="5" fill="white"/>
          <rect x="111.515" y="22.2503" width="29.8988" height="107.775" rx="5" fill="white"/>
          <rect x="53.8036" y="106.384" width="8.34384" height="8.34384" rx="4.17192" fill="white"/>
          <rect x="53.8036" y="95.2589" width="8.34384" height="8.34384" rx="4.17192" fill="white"/>
          <rect x="41.9832" y="95.2589" width="9.03917" height="8.34384" rx="4.17192" fill="white"/>
          <rect x="30.858" y="83.4384" width="31.2894" height="9.03917" rx="4.51958" fill="white"/>
      </svg>

  )
}

