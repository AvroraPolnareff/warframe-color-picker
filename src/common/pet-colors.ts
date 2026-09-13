import _petColors from "./pet_colors.json"

export type PetColor = {
  name: string,
  colorCode: string,
  price: string,
  event: string,
  type: string,
  imageName: string,
  bundleName: string
}

export const petColors = _petColors as PetColor[]
