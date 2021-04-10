const API_URL = "https://europe-west1-warframe-color-picker.cloudfunctions.net/webApi/api/v1"

export const exportPalette = async (name: string, colors: string[]) => {
  const res = await fetch(`${API_URL}/palettes`, {
    method: "POST",
    body: JSON.stringify({name, colors})
  })
  if (res.status === 400) throw new Error(await res.text())
  const shortId = await res.text() as string
  return `${window.location.href.split("?")[0]}?palette=${shortId}`
}

export const fetchPaletteById = async (id: string) => {
  const res = await fetch(`${API_URL}/palettes/${id}`)
  return await res.json() as { name: string, colors: string[] }
}
