import Color from "color";
import {ChangeEvent, useRef, useState} from "react";

const ROWS_COUNT = 18
const COLUMNS_COUNT = 5;

export interface Palette {
  name: string,
  colors: PaletteColor[]
}

export interface PaletteColor {
  hex: string,
  position: Position
}

export interface Position {
  x: number,
  y: number
}

const scanPalette = (image: HTMLImageElement, canvas: HTMLCanvasElement): PaletteColor[] | undefined => {
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0, 0, image.width, image.height)
  const yStep = image.height / ROWS_COUNT
  const xStep = image.width / COLUMNS_COUNT
  let colors: PaletteColor[] = []
  for (let y = 0; y < ROWS_COUNT; y++) {
    for (let x = 0; x < COLUMNS_COUNT; x++) {
      const width = Math.floor(xStep / 2 + xStep * x);
      const height = Math.floor(yStep / 2 + yStep * y);
      const pixel = Color(ctx.getImageData(width, height, 1, 1).data, "rgb").hex()
      colors.push({hex: pixel, position: {x, y}})
    }
  }
  return colors;
}

const PaletteExtractor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [result, setResult] = useState("")

  const onImageLoad = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const image = new Image()
      image.src = URL.createObjectURL(file)
      image.addEventListener("load", () => {
        if (!canvasRef.current) return
        const res = scanPalette(image, canvasRef.current)
        setResult(JSON.stringify(res))
      })
    }
  }

  return (
      <div style={{display:"flex"}}>
        <div>
          <input type="file" name="paletteImage" onChange={(e) => onImageLoad(e)}/>
          <canvas ref={canvasRef} />
        </div>
        <div>
          <textarea value={result} style={{height: "80vh", width:"300px"}}/>
        </div>
      </div>
  )
}

export default PaletteExtractor
