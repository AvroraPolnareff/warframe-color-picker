import {createContext, ReactNode, useEffect} from "react"
import {useStickyState} from "../hooks/useStickyState";
import {Colors} from "styled-components";
import {colors} from "../common/themes";

export enum Layout {
  EXPANDED = "EXPANDED",
  CLASSIC = "CLASSIC",
}

export enum Language {
  ENGLISH = "en",
  RUSSIAN = "ru",
  CHINESE = "zh_CN",
}

export type ThemeVariants = "night" | "day"

export interface Settings {
  layout: Layout,
  language: Language,
  theme: ThemeVariants,
  enableMOTD: boolean,
  setEnableMOTD: (enable: boolean) => void,
  setLanguage: (lang: Language) => void,
  setLayout: (layout: Layout) => void,
  setTheme: (theme: ThemeVariants) => void,
  colors: Colors,
  setColors:  React.Dispatch<React.SetStateAction<Colors>>
}

const initSettings: Settings = {
  layout: Layout.EXPANDED,
  language: Language.ENGLISH,
  theme: "night",
  colors: colors,
  setColors: () => {},
  enableMOTD: true,
  setLanguage: () => {},
  setTheme: () => {},
  setLayout: () => {},
  setEnableMOTD: () => {},
}

export const SettingsContext = createContext<Settings>(initSettings);


export const SettingsProvider = ({children, colors, setColors}: {children: ReactNode, colors: Colors, setColors: React.Dispatch<React.SetStateAction<Colors>>}) => {
  const [layout, setLayout] = useStickyState(initSettings.layout, "layout");
  const [language, setLanguage] = useStickyState(initSettings.language, "language");
  const [theme, setTheme] = useStickyState(initSettings.theme, "theme");
  const [enableMOTD, setEnableMOTD] = [false, (a: boolean) => {}];

  // fix improper hydration
  useEffect(() => {
    if (initSettings.layout !== layout) {
      setLayout(initSettings.layout)
      setTimeout(() => {
        setLayout(layout)
      })
    }
  }, [])

  return (
    <SettingsContext.Provider value={{
      layout,
      language,
      theme,
      enableMOTD,
      setLayout,
      setLanguage,
      setTheme,
      setEnableMOTD,
      colors,
      setColors
    }}>
      {children}
    </SettingsContext.Provider>
  )
}
