import { palettes } from "../common/palettes";
import { findClosestColors } from "../common/helpers";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MatchedColor } from "../components/Suggestions";
import { debounce, uniq } from "lodash";
import Color from "color";
import { useStickyState } from "./useStickyState";
import { UrlColorsState, UrlPaletteContext } from "../providers/UrlColorsProvider";
import { CurrentScreenContext, Screen } from "../providers/CurrentScreenProvider";
import { petColors } from "src/common/pet-colors";
import { getPaletteStorageKey, petLayout, warframeLayout, PaletteLayout } from "../services/paletteStorage";

export type { PaletteLayout } from "../services/paletteStorage"
export { petLayout, warframeLayout }

export const initColors: string[] = Array(48).fill("")

export const initAvailablePalettes = palettes.map((palette) => palette.name)

const initMatchedColor: MatchedColor = {
  kind: "palette",
  distance: 0,
  color: "#000000",
  paletteName: "Classic",
  position: { x: 0, y: 0 },
  uid: "3274823"
}

export const useColorPickerLogic = ({ paletteLayout }: { paletteLayout: PaletteLayout }) => {
  const [paletteColors, setPaletteColors] = useStickyState(initColors, getPaletteStorageKey(paletteLayout))
  const [matchedColors, setMatchedColors] = useState<MatchedColor[]>([])
  const [currentColor, setCurrentColor] = useState({ kind: paletteLayout.primary.kind, index: 0 })
  const [isColorChanging, setIsColorChanging] = useState(false)
  const [selectedColor, setSelectedColor] = useState<MatchedColor>(initMatchedColor)
  const [showPalettesModal, setShowPalettesModal] = useState(false)
  const [availablePalettes, setAvailablePalettes] = useStickyState<string[]>(
    initAvailablePalettes,
    "availablePalettes",
    palettes => {
      const filteredPalettes = palettes.filter(palette => initAvailablePalettes.includes(palette))
      const hasBrokenPaletteNames = palettes.length >= 0 && filteredPalettes.length === 0
      return hasBrokenPaletteNames ? ["Classic"] : filteredPalettes
    }
  )
  const { hookState, colors: importedColors, paletteImported } = useContext(UrlPaletteContext)
  const { screen, setScreen } = useContext(CurrentScreenContext)
  useEffect(() => {
    setCurrentColor({kind: paletteLayout.primary.kind, index: 0})
  }, [paletteLayout])

  useEffect(() => {
    if (hookState === UrlColorsState.LOADED && screen !== Screen.SCHEME_IMPORT) {
      setScreen(Screen.SCHEME_IMPORT);
    }
    if (hookState === UrlColorsState.CONFIRMED) {
      setPaletteColors(importedColors)
      paletteImported();
    }
  }, [hookState, setPaletteColors, screen, setScreen])


  const debounced = useRef(debounce((fn: () => void) => fn(), 150, { trailing: true, leading: false }))

  const getCurrentColor = (): string => {
    const color = paletteColors[currentColor.index]
    if (color === "") return "#000000"
    return color
  }

  const updateSuggestions = () => {
    switch (currentColor.kind) {
      case "palette": {
        const filteredPalettes = palettes.filter(palette => availablePalettes.indexOf(palette.name) !== -1)
        const closestColors = findClosestColors("palette", getCurrentColor(), filteredPalettes, 50)
        setMatchedColors(closestColors)
        setSelectedColor(closestColors[0])
        break
      }
      case "pet": {
        const closestColors = findClosestColors("pet", getCurrentColor(), petColors, 50)
        setMatchedColors(closestColors)
        setSelectedColor(closestColors[0])
        break
      }
    }
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
  }, [paletteColors, currentColor, availablePalettes, setIsColorChanging])

  const onCellClick = (index: number, e: React.MouseEvent) => {
    if (e.type === "contextmenu") {
      e.preventDefault();
      const newPaletteColors = [...paletteColors];
      newPaletteColors[index] = "";
      setPaletteColors(newPaletteColors);
    }
    switch (index) {
      case 0: return setCurrentColor({index, kind: paletteLayout.primary.kind})
      case 1: return setCurrentColor({index, kind: paletteLayout.secondary.kind})
      case 2: return setCurrentColor({index, kind: paletteLayout.tertiary.kind})
      case 3: return setCurrentColor({index, kind: paletteLayout.accents.kind})
      case 4: return setCurrentColor({index, kind: paletteLayout.emissive.kind})
      case 5: return setCurrentColor({index, kind: paletteLayout.emissive.kind})
      case 6: return setCurrentColor({index, kind: paletteLayout.energy.kind})
      case 7: return setCurrentColor({index, kind: paletteLayout.energy.kind})
    }
  }

  const onColorChange = (color: Color) => {
    const newColors = [...paletteColors]
    newColors[currentColor.index] = color.toString()
    setPaletteColors(newColors)
  }

  const onSuggestionClick = (key: string) => {
    const filteredColor = matchedColors.filter(({ uid }) => uid === key)[0]
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

  const clearAvailablePalettes = (palettes: string[]) => {
    const filteredPalettes = availablePalettes.filter(palette => !palettes.includes(palette))
    setAvailablePalettes(filteredPalettes.length ? filteredPalettes : ["Classic"])
  };

  const showAllAvailablePalettes = (palettes: string[]) => setAvailablePalettes(uniq([...availablePalettes, ...palettes]))

  const onScreenshotImport = (colors: string[]) => {
    setPaletteColors([
      ...paletteColors.slice(0, Math.floor(currentColor.index / 8) * 8),
      ...colors,
      ...paletteColors.slice(Math.floor(currentColor.index / 8 + 1) * 8)
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
    currentColor
  }
}
