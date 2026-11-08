import { Palette } from "./Palette.svelte"

export class Collection {
  name = $state("")
  palettes: Palette[] = $state([])
  id = crypto.randomUUID()

  constructor(opts: { name: string; initPalette?: boolean }) {
    this.name = opts.name
    if (opts.initPalette) {
      this.palettes.push(
        new Palette({ name: "New Palette", palette: "warframe" }),
      )
    }
  }
}

export class CollectionList {
  collections: Collection[] = $state([])

  constructor(opts?: { initCollection?: boolean }) {
    const { initCollection } = opts ?? {}
    if (initCollection) {
      this.collections.push(
        new Collection({ name: "Default", initPalette: true }),
      )
    }
  }

  insertCollection = (opts: { index?: number; name?: string }) => {
    const { index = this.collections.length - 1, name = "collection" } = opts
    this.collections.splice(index, 0, new Collection({ name, initPalette: true }))
  }

  deleteCollection = (index: number) => {
    this.collections.splice(index, 1)
  }
}
