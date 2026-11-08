import { differenceCiede2000, differenceEuclidean, type Color } from "culori"
import { colorToHsv, type CuloriHsv } from "#lib/util/color.ts"
import type {
  PaletteColorMode,
  PaletteColorPosition,
} from "#lib/types/palettes.ts"
import palettes from "#lib/assets/palettes.json"

export type Location =
  | {
      kind: "warframe"
      name: string
      position: PaletteColorPosition
    }
  | ({ kind: "pet" } & (typeof palettes.pets)[number])

export interface SuggestionEntry {
  color: Color
  score: number
  location: Location
}

export function isLocationEqual(a: Location, b: Location): boolean {
  switch (a.kind) {
    case "warframe":
      return (
        b.kind === "warframe" &&
        a.name === b.name &&
        a.position.x === b.position.x &&
        a.position.y === b.position.y
      )
    case "pet":
      return b.kind === "pet" && a.name === b.name
  }
}

export function locationKey(location: Location): string {
  switch (location.kind) {
    case "warframe":
      return JSON.stringify([
        "warframe",
        location.name,
        location.position.x,
        location.position.y,
      ])
    case "pet":
      return JSON.stringify(["pet", location.name])
  }
}

type Candidate = Pick<SuggestionEntry, "color" | "location">
type DiffFn = ReturnType<typeof differenceEuclidean>

const warframeColors = palettes.warframes.flatMap(({ name, colors }) =>
  colors.map(({ hex, position }): Candidate => ({
    color: colorToHsv(hex)!,
    location: { kind: "warframe", name, position },
  })),
)

const petColors = palettes.pets.map((petColor): Candidate => ({
  color: colorToHsv(petColor.colorCode)!,
  location: { ...petColor, kind: "pet" },
}))

function nearest(colors: readonly Candidate[]) {
  const ranked = colors.map(({ color, location }) => ({
    color,
    location,
    score: 0,
  }))

  return (
    color: Color,
    metric: DiffFn,
    limit = 1,
    threshold = Infinity,
  ): SuggestionEntry[] => {
    for (const candidate of ranked) {
      candidate.score = metric(color, candidate.color)
    }

    return ranked
      .sort((a, b) => a.score - b.score)
      .slice(0, Math.max(0, Math.min(limit, ranked.length)))
      .filter((candidate) => candidate.score < threshold)
      .map(({ color, location, score }) => ({ color, location, score }))
  }
}

export type DiffAlgo = "euqlidianRGB" | "ciede2000"

export class SuggestionList {
  suggestions: SuggestionEntry[] = $state([])
  algo: DiffAlgo = $state("euqlidianRGB")
  limit = 50

  get colorDifference(): DiffFn {
    switch (this.algo) {
      case "euqlidianRGB":
        return differenceEuclidean()
      case "ciede2000":
        return differenceCiede2000()
    }
  }

  private nearestFn = {
    warframe: nearest(warframeColors),
    pet: nearest(petColors),
  }

  findSimilar = (color: CuloriHsv, mode: PaletteColorMode) => {
    this.suggestions = this.nearestFn[mode](
      color,
      this.colorDifference,
      this.limit,
    )
  }
}
