import React, {CSSProperties} from "react";
import {useTheme, DefaultTheme} from "styled-components";

export const ExclamationMarkIcon = (
  {
    style
  }: {
    style?: CSSProperties
  }
) => {
  const {colors, mode} = useTheme() as DefaultTheme
  const contentColor = mode === "dark" ? colors.textOnBackground : colors.background

  return (
    <svg width="4" height="12" viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M0.566034 7.11637L-4.10766e-05 3.23472V-1.99012e-07H3.71988V3.23472L3.15381 7.11637H0.566034ZM3.16998 11.0304C2.81416 11.3862 2.37747 11.5641 1.85992 11.5641C1.34237 11.5641 0.900288 11.3862 0.533687 11.0304C0.177868 10.6638 -4.10766e-05 10.2217 -4.10766e-05 9.70415C-4.10766e-05 9.18659 0.177868 8.7499 0.533687 8.39409C0.900288 8.02748 1.34237 7.84418 1.85992 7.84418C2.37747 7.84418 2.81416 8.02748 3.16998 8.39409C3.53658 8.7499 3.71988 9.18659 3.71988 9.70415C3.71988 10.2217 3.53658 10.6638 3.16998 11.0304Z"
        fill={contentColor}
      />
    </svg>
  )
}
