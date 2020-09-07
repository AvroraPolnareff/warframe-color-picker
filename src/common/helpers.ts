import {MatchedColor} from "../components/Suggestions";
import {Palette} from "./Palette";
import {useEffect, useState} from "react";
import Color from "color";
import {initDefaultColors, initManualColors} from "../components/App";


export const findClosestColors = (colorToCompare: string, palettes: Palette[], limit: number): MatchedColor[] => {
  
  const distances = palettes.map(palette => {
    return palette.colors.map((color) => {
      const currentPosition = color.position
      const distance = colorDistanceRGB(Color(colorToCompare).hex(), color.hex)
      return {
        distance,
        color: color.hex,
        position: currentPosition,
        paletteName: palette.name,
        uid: `${distance}${JSON.stringify(currentPosition)}${palette.name}`
      } as MatchedColor
    })
  })
  
  return distances.flat(1)
    .sort((a: MatchedColor, b: MatchedColor) => a.distance - b.distance)
    .slice(0, limit)
  //.sort((a: MatchedColor, b :MatchedColor) =>  zOrder(a.color) - zOrder(b.color))
  
}

const zOrder = (color: string) => {
  const rgb = hexToRgb(color)
  return colorSplit(rgb.r) + (colorSplit(rgb.g) << 1) + (colorSplit(rgb.b) << 2);
}

const colorSplit = (a: number) => {
  a = (a | (a << 12)) & 0o0014000377;
  a = (a | (a << 8)) & 0o0014170017;
  a = (a | (a << 4)) & 0o0303030303;
  a = (a | (a << 2)) & 0o1111111111;
  return a
  
}

const colorDistanceRGB = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  return Math.sqrt((rgb2.r - rgb1.r) ** 2 + (rgb2.g - rgb1.g) ** 2 + (rgb2.b - rgb1.b) ** 2)
}
const colorDistanceRGBTuned = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  const red = (rgb1.r + rgb2.r) * 2
  return Math.sqrt((2 + red / 256) * (rgb2.r - rgb1.r) ** 2 + 4 * (rgb2.g - rgb1.g) ** 2 + (2 + (255 - red) / 256) * (rgb2.b - rgb1.b) ** 2)
}

function hexToRgb(hex: string) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  } else return {r: 0, b: 0, g: 0}
}

export const useStickyState = <T>(initState: T, sticker: string) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(sticker)
    return stickyValue !== null ? JSON.parse(stickyValue) : initState
  })
  
  useEffect(() => {
    window.localStorage.setItem(sticker, JSON.stringify(value))
  }, [sticker, value])
  
  return [value, setValue];
}

export const convertColorsToExportString = (defaultColors: string[], manualColors: string[]) => {
  const trimNulls = (colorsString: string): string => {
    const nullIndex = colorsString.lastIndexOf("#NULL")
    if (colorsString.slice(0, nullIndex).length === colorsString.length - 5)
      return trimNulls(colorsString.slice(0, nullIndex))
    else
      return colorsString
    
  }
  
  const defaultColorsString = defaultColors.reduce((prev, current, index) => {
    if (index === 1) {
      return Color(prev).hex() + Color(current).hex();
    }
    if (current !== initDefaultColors[index]) {
      return prev + Color(current).hex();
    } else {
      return prev + "#NULL";
    }
  })
  const manualColorsString = manualColors.reduce((prev, current, index) => {
    if (index === 1) {
      return Color(prev).hex() + Color(current).hex();
    }
    if (current !== initManualColors[index]) {
      return prev + Color(current).hex();
    } else {
      return prev + "#NULL";
    }
  })
  return `DEFAULT${trimNulls(defaultColorsString)}MANUAL${trimNulls(manualColorsString)}`
}

export const convertExportStringToColors = (exportString: string) => {
  if (!exportString.startsWith("DEFAULT")) throw Error("'DEFAULT' string not found.")
  
  const manualColorsPosition = exportString.indexOf("MANUAL")
  if (manualColorsPosition === -1) throw Error("'MANUAL' string not found.")
  
  const defaultColorsString = exportString.slice(7, manualColorsPosition).slice(1)
  const manualColorsString = exportString.slice(manualColorsPosition + 6).slice(1)
  
  const defaultColors = defaultColorsString.split('#')
  if (defaultColors.length > 8) throw Error("Default colors length is bigger than 8.")
  
  const manualColors = manualColorsString.split('#')
  if (manualColors.length > 48) throw Error("Manual colors length is bigger than 48.")
  
  const regexp = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i
  
  let validDefaultColors = defaultColors.map((color, index) => {
    if (color.match(regexp)) return "#" + color
    else if (color === "NULL") return initDefaultColors[index]
    else throw Error(`color "${color} in default colors is not valid"`)
  })
  
  if (validDefaultColors.length < 8) {
    validDefaultColors.push(...initDefaultColors.slice(validDefaultColors.length))
  }
  
  let validManualColors = manualColors.map((color, index) => {
    if (color.match(regexp)) return "#" + color
    else if (color === "NULL") return initManualColors[index]
    else throw Error(`color "${color} in manual colors is not valid"`)
  })
  
  if (validManualColors.length < 48) {
    validManualColors.push(...initManualColors.slice(validManualColors.length))
  }
  return {defaultColors: validDefaultColors, manualColors: validManualColors}
  
}


export const colorsFromImage = (image: CanvasImageSource) : string[] => {
  const canvas = document.createElement("canvas")
  canvas.width = image.width as number
  canvas.height = image.height as number
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("canvas is not loaded")
  
  ctx.drawImage(image, 0, 0)
  const width = image.width as number
  const height = image.height as number
  
  const yStep = height / 6
  const yOffset = yStep / 2
  
  const xStep = width / 2
  const xOffset = xStep / 2
  
  let colors : string[] = []
  
  for (let i = 0; i < 4; i++) {
    const y = yStep * i + yOffset
    
    colors.push(Color(ctx.getImageData(xStep, y, 1, 1).data, "rgb").hex())
  }
  
  for (let i = 4; i < 6; i++) {
    const y = yStep * i + yOffset
    for (let j = 0; j < 2; j++) {
      const x = xStep * j + xOffset
      colors.push(Color(ctx.getImageData(x, y, 1, 1).data, "rgb").hex())
    }
    
  }
  canvas.remove()
  return colors
}