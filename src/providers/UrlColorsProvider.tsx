import {createContext, FC, useEffect, useState} from "react";
import {fetchPaletteById} from "../common/inner-api";

interface UrlColors {
  loaded: boolean
  imported: boolean
  setImported: (imported: boolean) => void
  colors: string[]
  name: string
}

const initUrlColors: UrlColors = {
  loaded: false,
  imported: false,
  setImported: () => {},
  colors: [],
  name: ""
}

export const UrlColorsContext = createContext<UrlColors>(initUrlColors);

export const UrlColorsContextProvider: FC = ({children}) => {
  const [imported, setImported] = useState(initUrlColors.imported)
  const [loaded, setLoaded] = useState(initUrlColors.loaded)
  const [colors, setColors] = useState(initUrlColors.colors)
  const [name, setName] = useState(initUrlColors.name)

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
  return (
    <UrlColorsContext.Provider value={{
      imported,
      setImported,
      loaded,
      colors,
      name,
    }}>
      {children}
    </UrlColorsContext.Provider>
  )
}

