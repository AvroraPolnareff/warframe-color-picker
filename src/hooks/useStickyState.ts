import {useEffect, useState} from "react";

export const useStickyState = <T>(initState: T, sticker: string) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(sticker)
    return stickyValue !== null ? JSON.parse(stickyValue) : initState
  })

  useEffect(() => {
    window.localStorage.setItem(sticker, JSON.stringify(value))
  }, [sticker, value])

  return [value, setValue];
}