import {createContext, ReactNode, useEffect, useRef, useState} from "react";
import {exportPalette, fetchPaletteById} from "../common/inner-api";
import {decodePalette, encodePalette} from "../services/palette-encoder";

export enum UrlColorsState {
  INIT,
  LOADED,
  CONFIRMED,
  IMPORTED,
  REJECTED,
}

interface UrlPalette {
  colors: string[]
  name: string
  savePalette: (palette: {name: string, colors: string[]}) => string
  confirmPalette: (confirmed: boolean) => void
  hookState: UrlColorsState
  paletteImported: () => void
}

const initUrlPalette: UrlPalette = {
  colors: [],
  name: "",
  savePalette: () => "",
  confirmPalette: (confirmed) => {},
  hookState: UrlColorsState.INIT,
  paletteImported: () => {}
}

export const UrlPaletteContext = createContext<UrlPalette>(initUrlPalette);

export const UrlPaletteContextProvider = ({children}: {children: ReactNode}) => {
  const [hookState, setHookState] = useState(UrlColorsState.INIT)
  const [colors, setColors] = useState(initUrlPalette.colors)
  const [name, setName] = useState(initUrlPalette.name)
  const url = useRef("")

  useEffect(() => {
    if (typeof window === "undefined") return
    if (hookState !== UrlColorsState.INIT) return;
    const url = new URL(window.location.href)
    const getPalette = async (id: string) => {
      if (!id) return setHookState(UrlColorsState.REJECTED)
      try {
        const palette = await fetchPaletteById(id)
        setColors(palette.colors)
        setName(palette.name)
        url.searchParams.delete("palette")
        window.history.replaceState("", document.title, url.href)
        setHookState(UrlColorsState.LOADED)
      } catch (e) {}
    }

    const encodedPalette = url.searchParams.get("paletteEncoded")
    if (encodedPalette) {
      try {
        const {name, colors} = decodePalette(encodedPalette) as {name: string, colors: string[]}
        setName(name)
        setColors(colors)
        url.searchParams.delete("paletteEncoded")
        window.history.replaceState("", document.title, url.href)
        setHookState(UrlColorsState.LOADED)
      } catch (e) {}
    } else {
      const id = url.searchParams.get("palette")
      if (id) getPalette(id)
    }
  }, [hookState])

  const savePalette = (palette: {name: string, colors: string[]}) => {
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

  const confirmPalette = (confirmed: boolean) => {
    setHookState(confirmed ? UrlColorsState.CONFIRMED : UrlColorsState.REJECTED)
  }

  const paletteImported = () => {
    setHookState(UrlColorsState.IMPORTED)
  }

  return (
    <UrlPaletteContext.Provider value={{
      colors,
      name,
      savePalette,
      hookState,
      confirmPalette,
      paletteImported,
    }}>
      {children}
    </UrlPaletteContext.Provider>
  )
}

