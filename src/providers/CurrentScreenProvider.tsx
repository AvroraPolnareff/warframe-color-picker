import {createContext, ReactNode, useState} from "react";

export enum Screen {
  COLOR_PICKER = "COLOR_PICKER",
  LANGUAGE_SELECTION = "LANGUAGE_SELECTION",
  LAYOUT_SELECTION = "LAYOUT_SELECTION",
  SCHEME_IMPORT = "SCHEME_IMPORT"
}

export interface Settings {
  screen: Screen,
  setScreen: (screen: Screen) => void,
}

const initSettings: Settings = {
  screen: Screen.COLOR_PICKER,
  setScreen: () => {},
}

export const CurrentScreenContext = createContext<Settings>(initSettings);

export const CurrentScreenProvider = ({children}: { children: ReactNode }) => {
  const [screen, setScreen] = useState(initSettings.screen);

  return (
    <CurrentScreenContext.Provider value={{
      screen, setScreen,
    }}>
      {children}
    </CurrentScreenContext.Provider>
  )
}
