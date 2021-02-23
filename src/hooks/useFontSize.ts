import {useEffect, useState} from "react";

const getFontSize = () => {
  return parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'))
}

export const useFontSize = () => {
  const [fontSize, setFontSize] = useState(getFontSize())
  useEffect(() => {
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