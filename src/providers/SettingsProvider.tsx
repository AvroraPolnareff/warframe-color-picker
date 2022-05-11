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

export interface Settings {
  layout: Layout,
  language: Language,
  enableMOTD: boolean,
  setEnableMOTD: (enable: boolean) => void,
  setLanguage: (lang: Language) => void,
  setLayout: (layout: Layout) => void,
  colors: Colors,
  setColors:  React.Dispatch<React.SetStateAction<Colors>>
}

const initSettings: Settings = {
  layout: Layout.EXPANDED,
  language: Language.ENGLISH,
  colors: colors,
  setColors: () => {},
  enableMOTD: true,
  setLanguage: () => {},
  setLayout: () => {},
  setEnableMOTD: () => {},
}

export const SettingsContext = createContext<Settings>(initSettings);


export const SettingsProvider = ({children, colors, setColors}: {children: ReactNode, colors: Colors, setColors: React.Dispatch<React.SetStateAction<Colors>>}) => {
  const [layout, setLayout] = useStickyState(initSettings.layout, "layout");
  const [language, setLanguage] = useStickyState(initSettings.language, "language");
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
      enableMOTD,
      setLayout,
      setLanguage,
      setEnableMOTD,
      colors,
      setColors
    }}>
      {children}
    </SettingsContext.Provider>
  )
}
