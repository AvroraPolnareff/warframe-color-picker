const API_URL = "https://europe-west1-warframe-color-picker.cloudfunctions.net/webApi/api/v1"

export const exportPalette = async (name: string, colors: string[]) => {
  const res = await fetch(`${API_URL}/palettes`, {
    method: "POST",
    body: JSON.stringify({name, colors})
  })
  const shortId = await res.text() as string
  return `${window.location.href}?palette=${shortId}`
}
