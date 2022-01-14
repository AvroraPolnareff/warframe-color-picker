import {useEffect, useState} from "react";

const getState = <T>(initState: T, sticker: string) => {
  if (typeof window === "undefined") return initState
  const stickyValue = window.localStorage.getItem(sticker)
  return stickyValue !== null ? JSON.parse(stickyValue) : initState
}

export const useStickyState = <T>(initState: T, sticker: string) => {
  const [value, setValue] = useState(getState(initState, sticker))

  useEffect(() => setValue(getState(initState, sticker)), [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(sticker, JSON.stringify(value))
  }, [sticker, value])

  return [value, setValue];
}
