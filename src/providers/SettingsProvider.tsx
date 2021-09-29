import {createContext, ReactNode} from "react";
import {useStickyState} from "../hooks/useStickyState";

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
}

const initSettings: Settings = {
  layout: Layout.EXPANDED,
  language: Language.ENGLISH,
  enableMOTD: true,
  setLanguage: () => {},
  setLayout: () => {},
  setEnableMOTD: () => {},
}

export const SettingsContext = createContext<Settings>(initSettings);


export const SettingsProvider = ({children}: {children: ReactNode}) => {
  const [layout, setLayout] = useStickyState(initSettings.layout, "layout");
  const [language, setLanguage] = useStickyState(initSettings.language, "language");
  const [enableMOTD, setEnableMOTD] = [false, (a: boolean) => {}];

  return (
    <SettingsContext.Provider value={{
      layout,
      language,
      enableMOTD,
      setLayout,
      setLanguage,
      setEnableMOTD,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}
