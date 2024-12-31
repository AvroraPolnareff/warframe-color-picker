import {MatchedColor} from "../components/Suggestions";
import {Palette} from "./Palette";
import Color from "color";

const getDistances = (colorToCompare: string, palettes: Palette[]) => {
  return palettes.map(palette => {
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
}

export const findClosestColors = (colorToCompare: string, palettes: Palette[], limit: number): MatchedColor[] => {
  const distances = getDistances(colorToCompare, palettes)  
  return distances.flat(1)
    .sort((a: MatchedColor, b: MatchedColor) => a.distance - b.distance)
    .slice(0, limit)
}

const colorDistanceRGB = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  return Math.sqrt((rgb2.r - rgb1.r) ** 2 + (rgb2.g - rgb1.g) ** 2 + (rgb2.b - rgb1.b) ** 2)
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

export const convertColorsToExportString = (paletteColors: string[]) => {
  
  return paletteColors.reduce((prev, current) => (
    current === "" ? prev + "#" : prev + Color(current).hex()
  ), "")
}


export const convertExportStringToColors = (exportString: string) => {
  
  const paletteColors = exportString.split('#').slice(1)
  if (paletteColors.length !== 48) throw Error("Palette colors length is not equal 48.")
  
  const regexp = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i

  return paletteColors.map((color) => {
    if (color === "")
      return ""
    else if (color.match(regexp))
      return "#" + color
    else
      throw Error(`Color "${color}" in given string is not valid.`)
  })
  
}


export const colorsFromImage = (image: HTMLImageElement): string[] => {
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
  
  let colors: string[] = []
  
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

interface ShortenTextOptions {
  saveFormat: boolean
}

export const shortenText = (text: string, length: number, options: Partial<ShortenTextOptions> = {}) => {
  if (text.length <= length) return text

  const formatLabel = text.lastIndexOf(".") !== -1 ? text.substring(text.lastIndexOf(".") - 3) : ""
  const cutLength = options.saveFormat ? length - formatLabel.length : length
  const firstPart = text.substring(0, cutLength)
  return `${firstPart.trim()}.${options.saveFormat ? formatLabel : ""}`
}
