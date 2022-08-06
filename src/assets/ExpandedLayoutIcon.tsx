import {useTheme} from "styled-components";

export const ExpandedLayoutIcon = () => {
  const {colors, mode} = useTheme()
  const contentColor = mode === "dark" ? colors.textOnBackground : colors.background
  return (
      <svg width="163" height="162" viewBox="0 0 163 162" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.957703" width="162" height="162" rx="20" className="svg-fill" fill={colors.buttons} style={{transition: "fill 0.5s ease"}}/>
          <rect x="10.4258" y="15.8529" width="47.9812" height="59.0926" rx="5" fill={contentColor}/>
          <rect x="10.4571" y="79.6504" width="47.9038" height="35.787" rx="5" fill={contentColor}/>
          <rect x="63.1515" y="15.8255" width="47.9038" height="130.467" rx="5" fill={contentColor}/>
          <rect x="115.846" y="15.6846" width="35.787" height="130.608" rx="5" fill={contentColor}/>
          <rect x="47.0894" y="132.204" width="10.8488" height="10.8488" rx="5" fill={contentColor}/>
          <rect x="32.9999" y="132.204" width="10.8488" height="10.8488" rx="5" fill={contentColor}/>
          <rect x="18.9107" y="132.204" width="10.8488" height="10.8488" rx="5" fill={contentColor}/>
          <rect x="18.9107" y="118.537" width="39.0275" height="10.7079" rx="5" fill={contentColor}/>
      </svg>

  )
}
