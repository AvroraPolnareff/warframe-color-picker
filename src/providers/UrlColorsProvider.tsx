import {createContext, FC, ReactNode, useEffect, useRef, useState} from "react";
import {exportPalette, fetchPaletteById} from "../common/inner-api";

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
    const getPalette = async () => {
      const url = new URL(window.location.href)
      const id = url.searchParams.get("palette")
      if (!id) return
      try {
        const palette = await fetchPaletteById(id)
        setColors(palette.colors)
        setName(palette.name)
        setLoaded(true)
      } catch (e) {

      }

    }
    if (loaded) return;
    getPalette()
  }, [loaded])

  const savePalette = async (palette: {name: string, colors: string[]}) => {
    if (palette.name === name && palette.colors.join() === colors.join()) return url.current
    try {
      url.current = await exportPalette(palette.name, palette.colors)
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

