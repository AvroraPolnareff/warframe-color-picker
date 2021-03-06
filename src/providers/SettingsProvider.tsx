import { useState } from "react";
import {createContext, FC, useContext} from "react";

export enum Layout {
  EXPANDED = "EXPANDED",
  CLASSIC = "CLASSIC",
}

export enum Language {
  ENGLISH = "ENGLISH",
  RUSSIAN = "RUSSIAN",
}

export interface Settings {
  layout: Layout,
  language: Language,
  setLanguage: (lang: Language) => void,
  setLayout: (layout: Layout) => void,
}

const initSettings: Settings = {
  layout: Layout.EXPANDED,
  language: Language.ENGLISH,
  setLanguage: () => {},
  setLayout: () => {},
}

export const SettingsContext = createContext<Settings>(initSettings);


export const SettingsProvider: FC = ({children}) => {
  const [layout, setLayout] = useState(initSettings.layout);
  const [language, setLanguage] = useState(initSettings.language);
  return (
    <SettingsContext.Provider value={{
      layout,
      language,
      setLayout,
      setLanguage,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}