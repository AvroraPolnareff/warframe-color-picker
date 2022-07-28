import {palettes} from "../common/palettes";
import {convertExportStringToColors, findClosestColors} from "../common/helpers";
import React, {useContext, useEffect, useRef, useState} from "react";
import {MatchedColor} from "../components/Suggestions";
import {debounce} from "lodash";
import Color from "color";
import {useStickyState} from "./useStickyState";
import {UrlColorsState, UrlPaletteContext} from "../providers/UrlColorsProvider";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";

export const initColors : string[] = Array(48).fill("")

export const initAvailablePalettes = palettes.map((palette) => palette.name)

const initMatchedColor = {
  distance: 0,
  color: "#000000",
  paletteName: "Classic",
  position: {x: 0, y: 0},
  uid: "3274823"
}



export const useColorPickerLogic = () => {
  const [paletteColors, setPaletteColors] = useStickyState(initColors, "manualColors")
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const [matchedColors, setMatchedColors] = useState<MatchedColor[]>([])
  const [isColorChanging, setIsColorChanging] = useState(false)
  const [selectedColor, setSelectedColor] = useState<MatchedColor>(initMatchedColor)
  const [showPalettesModal, setShowPalettesModal] = useState(false)
  const [availablePalettes, setAvailablePalettes] = useStickyState<string[]>(initAvailablePalettes, "availablePalettes")
  const {hookState, colors: importedColors, paletteImported} = useContext(UrlPaletteContext)
  const {screen, setScreen} = useContext(CurrentScreenContext)

  useEffect(() => {
    if (hookState === UrlColorsState.LOADED && screen !== Screen.SCHEME_IMPORT) {
      setScreen(Screen.SCHEME_IMPORT);
    }
    if (hookState === UrlColorsState.CONFIRMED) {
      setPaletteColors(importedColors)
      paletteImported();
    }
  }, [hookState, setPaletteColors, screen, setScreen])


  const debounced = useRef(debounce((fn: () => void) => fn(), 150, {trailing: true, leading: false}))

  const getCurrentColor = (): string => {
    const color = paletteColors[currentColorIndex]
    if (color === "") return "#000000"
    return color
  }

  const updateSuggestions = () => {
    const filteredPalettes = palettes.filter(palette => availablePalettes.indexOf(palette.name) !== -1)
    const closestColors = findClosestColors(getCurrentColor(), filteredPalettes, 50)
    setMatchedColors(closestColors)
    setSelectedColor(closestColors[0])
    setIsColorChanging(false)
  }

  useEffect(() => {
    updateSuggestions()
  }, [])

  useEffect(() => {
    if (!isColorChanging) {
      setIsColorChanging(true)
    }
    debounced.current(updateSuggestions)
  }, [paletteColors, currentColorIndex, availablePalettes, setIsColorChanging])

  const onCellClick = (index: number, e: React.MouseEvent) => {
    if (e.type === "contextmenu") {
      e.preventDefault();
      const newPaletteColors = [...paletteColors];
      newPaletteColors[index] = "";
      setPaletteColors(newPaletteColors);
    }
    setCurrentColorIndex(index);
  }

  const onColorChange = (color: Color) => {
    const newColors = [...paletteColors]
    newColors[currentColorIndex] = color.toString()
    setPaletteColors(newColors)
  }

  const onSuggestionClick = (key: string) => {
    const filteredColor = matchedColors.filter(({uid}) => uid === key)[0]
    if (filteredColor.uid !== selectedColor.uid) {
      setSelectedColor(filteredColor);
    }
  }

  const onPaletteClick = (paletteName: string) => {
    const isExists = availablePalettes.indexOf(paletteName) !== -1
    if (isExists) {
      if (availablePalettes.length === 1) {
        setAvailablePalettes(["Classic"])
        return
      }
      setAvailablePalettes(availablePalettes.filter((el: string) => el !== paletteName))
    } else {
      setAvailablePalettes([...availablePalettes, paletteName])
    }
  }

  const onOverrideColor = () => {
    onColorChange(Color(selectedColor.color))
  }

  const clearAvailablePalettes = () => setAvailablePalettes(["Classic"]);

  const showAllAvailablePalettes = () => setAvailablePalettes(initAvailablePalettes)

  const onScreenshotImport = (colors: String[]) => {
    setPaletteColors([
      ...paletteColors.slice(0, Math.floor(currentColorIndex / 8) * 8),
      ...colors,
      ...paletteColors.slice(Math.floor(currentColorIndex / 8 + 1) * 8)
    ]);
  }

  return {
    availablePalettes,
    showPalettesModal,
    setShowPalettesModal,
    onPaletteClick,
    clearAvailablePalettes,
    showAllAvailablePalettes,

    onScreenshotImport,

    paletteColors,
    onCellClick,

    getCurrentColor,
    onColorChange,

    matchedColors,
    onSuggestionClick,
    // TODO refactor method name
    isColorChanging,
    // TODO refactor method name
    onOverrideColor,

    selectedColor,
  }
}

