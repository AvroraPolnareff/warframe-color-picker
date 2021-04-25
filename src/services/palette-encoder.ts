import Color from "color";

export const encodePalette = (name: string, colors: string[]) => {
  try {
    const hexColors = colors.map(color => color ? Color(color).hex().slice(1) : "")
    const stringifiedColors = hexColors.reduce(
      (result, currentColor, index) => currentColor ? `${result}${index}-${currentColor}` : result
    , "")
    return `${encodeURIComponent(name)}___${stringifiedColors}`
  } catch (e) {
    console.error(e)
  }
}

export const decodePalette = (encodedPalette: string) => {
  try {
    const [encodedName, encodedColors] = encodedPalette.split("___")
    const colorsWithIndexes = Array
      .from(encodedColors.matchAll(/(\d+)-(\w{6})/g))
      .map(([, index, color]) => [parseInt(index, 10), color])
    const decodedColors : string[] = Array(48).fill("")
    colorsWithIndexes.forEach(([index, color]) => decodedColors[index as number] = Color(`#${color}`).hex())
    return {
      name: decodeURIComponent(encodedName),
      colors: decodedColors
    }
  } catch (e) {
    alert("import error!")
    console.error(e)
  }
}
