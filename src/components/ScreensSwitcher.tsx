import {FC, useContext} from "react";
import {CurrentScreenContext} from "../providers/CurrentScreenProvider";
import {Layout, SettingsContext} from "../providers/SettingsProvider";
import {Classic} from "./layouts/Classic";
import {Expanded} from "./layouts/Expanded";
import {Layouts} from "./screens/Layouts";
import {Screen} from "../providers/CurrentScreenProvider";


export const ScreensSwitcher = () => {
  const {screen} = useContext(CurrentScreenContext);
  const {layout} = useContext(SettingsContext);
  switch (screen) {
    case Screen.COLOR_PICKER: return <CurrentLayout layout={layout}/>
    case Screen.LAYOUT_SELECTION: return <Layouts/>
  }
}

const CurrentLayout: FC<{layout: Layout}> = ({layout}) => {
  switch (layout) {
    case Layout.CLASSIC: return <Classic/>
    case Layout.EXPANDED: return <Expanded/>
  }
}