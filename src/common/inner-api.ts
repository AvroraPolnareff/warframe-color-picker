const API_URL = "https://europe-west1-warframe-color-picker.cloudfunctions.net/webApi/api/v1"

export const exportPalette = async (name: string, palette: string[]) => {
  const res = await fetch(`${API_URL}/palettes`, {
    method: "POST",
    body: JSON.stringify({name, palette})
  })
  const shortId = await res.json() as string
  return `${window.location.href}/#/palette/${shortId}`
}
