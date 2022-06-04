import {createContext, ReactNode, useEffect, useState} from "react"
import {useStickyState} from "../hooks/useStickyState";
import {Colors, DefaultTheme, ThemeColors} from "styled-components";
import {createTheme, dayTheme, nightTheme} from "../common/themes";

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
  colors: DefaultTheme,
  setColors: React.Dispatch<React.SetStateAction<DefaultTheme>>
}

const initSettings: Settings = {
  layout: Layout.EXPANDED,
  language: Language.ENGLISH,
  theme: "night",
  colors: createTheme(nightTheme),
  setColors: () => {},
  enableMOTD: true,
  setLanguage: () => {},
  setTheme: () => {},
  setLayout: () => {},
  setEnableMOTD: () => {},
}

export const SettingsContext = createContext<Settings>(initSettings);


export const SettingsProvider = (props: {children: ReactNode, theme: DefaultTheme, setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>}) => {
  const [layout, setLayout] = useStickyState(initSettings.layout, "layout")
  const [language, setLanguage] = useStickyState(initSettings.language, "language")
  const [theme, setTheme] = useStickyState(initSettings.theme, "theme")
  const [enableMOTD, setEnableMOTD] = [false, (a: boolean) => {}]

  useEffect(() => {
    props.setTheme(createTheme(theme === "night" ? nightTheme : dayTheme))
  }, [theme])

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
      colors: props.theme,
      setColors: props.setTheme,
    }}>
      {props.children}
    </SettingsContext.Provider>
  )
}
