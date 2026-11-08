import type { CollectionList } from "./CollectionList.svelte"

export class ColorSelection {
  private selectedColorIndex = $state({ index: 0, secondary: false })
  private selectedPaletteIndex = $state(0)
  private paletteCollectionIndex = $state(0)

  constructor(private collectionList: CollectionList) {}

  get color() {
    return this.selectedColorIndex.secondary
      ? this.paletteColor.secondaryColor!
      : this.paletteColor.color
  }
  get paletteColor() {
    return this.palette.paletteColors[this.selectedColorIndex.index]
  }

  get palette() {
    return this.collection.palettes[this.selectedPaletteIndex]
  }

  get collection() {
    return this.collectionList.collections[this.paletteCollectionIndex]
  }

  get colorIndex() {
    return this.selectedColorIndex
  }
  set colorIndex(v: { index: number; secondary: boolean }) {
    if (
      v.index >= 0 &&
      v.index < this.palette.paletteColors.length
    ) {
      this.selectedColorIndex = structuredClone(v)
    }
  }

  get paletteIndex() {
    return this.selectedPaletteIndex
  }
  set paletteIndex(v: number) {
    if (
      v >= 0 &&
      v < this.collection.palettes.length
    ) {
      this.selectedPaletteIndex = v
    }
  }

  get collectionIndex() {
    return this.paletteCollectionIndex
  }
  set collectionIndex(v: number) {
    if (
      v >= 0 &&
      v < this.collectionList.collections.length
    ) {
      this.paletteCollectionIndex = v
    }
  }
}
