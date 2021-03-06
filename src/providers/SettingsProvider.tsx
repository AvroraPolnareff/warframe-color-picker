import {createContext, FC} from "react";
import {useStickyState} from "../hooks/useStickyState";

export enum Layout {
  EXPANDED = "EXPANDED",
  CLASSIC = "CLASSIC",
}

export enum Language {
  ENGLISH = "ENGLISH",
  //RUSSIAN = "RUSSIAN",
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
  const [layout, setLayout] = useStickyState(initSettings.layout, "layout");
  const [language, setLanguage] = useStickyState(initSettings.language, "language");

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