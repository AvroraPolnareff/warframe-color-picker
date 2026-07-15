import { useEffect, useState } from "react";

export const useStickyState = <T>(initState: T, sticker: string, loader: (value: T) => T = a => a) => {
  const [value, setValue] = useState(initState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stickyValue = window.localStorage.getItem(sticker);
      if (stickyValue !== null) {
        try {
          setValue(loader(JSON.parse(stickyValue)));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [sticker]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(sticker, JSON.stringify(value));
    }
  }, [sticker, value]);

  return [value, setValue] as const;
};
