import {MatchedColor} from "../components/Suggestions";
import {Palette} from "./Palette";


export const findClosestColors = (colorToCompare : string, palettes : Palette[], limit: number) : MatchedColor[] => {
  
  const distances = palettes.map(palette => {
    return palette.colors.map((color) => {
      const currentPosition = color.position
      const distance = colorDistance(colorToCompare, color.hex)
      return {distance, color: color.hex, position: currentPosition, paletteName: palette.name} as MatchedColor
    })
  })
  
  return distances.flat(1).sort((a: MatchedColor, b :MatchedColor) => a.distance - b.distance).slice(0, limit)
}

const colorDistance = (color1: string, color2: string) : number => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  return Math.sqrt((rgb2.r - rgb1.r) ** 2 + (rgb2.g - rgb1.g) ** 2 + (rgb2.b - rgb1.b) ** 2)
}

function hexToRgb(hex : string) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  } else return {r: 0, b:0, g: 0}
  
}
