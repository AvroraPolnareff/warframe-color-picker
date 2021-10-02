import {useEffect, useState} from "react";

const getFontSize = () => {
  if (typeof window === "undefined") return process.env.ssrFontSize
  return parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'))
}

export const useFontSize = () => {
  const [fontSize, setFontSize] = useState(getFontSize())
  useEffect(() => {
    if (typeof window === "undefined") return
    const onResize = () => {
      setFontSize(getFontSize())
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [fontSize])

  return fontSize
}
