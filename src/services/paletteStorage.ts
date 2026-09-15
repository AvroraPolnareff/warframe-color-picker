import type {MatchedColor} from "../components/Suggestions";

export type PaletteId = "warframe" | "pets"

export type PaletteLayout = {
  primary: {enabled: boolean, kind: MatchedColor["kind"]}
  secondary: {enabled: boolean, kind: MatchedColor["kind"]}
  tertiary: {enabled: boolean, kind: MatchedColor["kind"]}
  accents: {enabled: boolean, kind: MatchedColor["kind"]}
  emissive: {enabled: boolean, dual: boolean, kind: MatchedColor["kind"]}
  energy: {enabled: boolean, dual: boolean, kind: MatchedColor["kind"]}
  id: PaletteId
}

export const warframeLayout: PaletteLayout = {
  primary: {enabled: true, kind: "palette"},
  secondary: {enabled: true, kind: "palette"},
  tertiary: {enabled: true, kind: "palette"},
  accents: {enabled: true, kind: "palette"},
  emissive: {enabled: true, dual: true, kind: "palette"},
  energy: {enabled: true, dual: true, kind: "palette"},
  id: "warframe",
}

export const petLayout: PaletteLayout = {
  primary: {enabled: true, kind: "pet"},
  secondary: {enabled: true, kind: "pet"},
  tertiary: {enabled: true, kind: "pet"},
  accents: {enabled: true, kind: "pet"},
  emissive: {enabled: true, dual: false, kind: "pet"},
  energy: {enabled: true, dual: false, kind: "palette"},
  id: "pets",
}

export const getPaletteStorageKey = (layout: PaletteLayout) => `paletteColors:${layout.id}`

export const loadPaletteColors = (layout: PaletteLayout): string[] => {
  if (typeof window === "undefined") return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(getPaletteStorageKey(layout)) ?? "[]")
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error(e)
    return []
  }
}
