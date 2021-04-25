import {createContext, ReactNode, useEffect, useRef, useState} from "react";
import {exportPalette, fetchPaletteById} from "../common/inner-api";
import {decodePalette, encodePalette} from "../services/palette-encoder";

interface UrlColors {
  loaded: boolean
  imported: boolean
  setImported: (imported: boolean) => void
  colors: string[]
  name: string
  savePalette: (palette: {name: string, colors: string[]}) => Promise<string>
}

const initUrlColors: UrlColors = {
  loaded: false,
  imported: false,
  setImported: () => {},
  colors: [],
  name: "",
  savePalette: async () => ""
}

export const UrlColorsContext = createContext<UrlColors>(initUrlColors);

export const UrlColorsContextProvider = ({children}: {children: ReactNode}) => {
  const [imported, setImported] = useState(initUrlColors.imported)
  const [loaded, setLoaded] = useState(initUrlColors.loaded)
  const [colors, setColors] = useState(initUrlColors.colors)
  const [name, setName] = useState(initUrlColors.name)
  const url = useRef("")

  useEffect(() => {
    if (loaded) return;
    const getPalette = async (id: string) => {
      if (!id) return
      try {
        const palette = await fetchPaletteById(id)
        setColors(palette.colors)
        setName(palette.name)
        setLoaded(true)
        window.history.replaceState("", document.title, "")
      } catch (e) {}
    }

    const url = new URL(window.location.href)
    const encodedPalette = url.searchParams.get("paletteEncoded")
    if (encodedPalette) {
      try {
        const {name, colors} = decodePalette(encodedPalette) as {name: string, colors: string[]}
        setName(name)
        setColors(colors)
        setLoaded(true)
        url.searchParams.delete("paletteEncoded")
        window.history.replaceState("", document.title, url.href)
      } catch (e) {}
    } else {
      const id = url.searchParams.get("palette")
      if (id) getPalette(id)
    }
  }, [loaded])

  const savePalette = async (palette: {name: string, colors: string[]}) => {
    if (palette.name === name && palette.colors.join() === colors.join()) return url.current
    try {
      const encodedPalette = encodePalette(palette.name, palette.colors)
      url.current = `${window.location.href.split("?")[0]}?paletteEncoded=${encodedPalette}`
      setColors(palette.colors)
      setName(palette.name)
    } catch (e) {
      throw Error("something went wrong")
    }
    return url.current
  }
  return (
    <UrlColorsContext.Provider value={{
      imported,
      setImported,
      loaded,
      colors,
      name,
      savePalette,
    }}>
      {children}
    </UrlColorsContext.Provider>
  )
}

