import React, {CSSProperties} from "react";

export const SwapIcon = (
  {
    style
  }: {
    style?: CSSProperties
  }
) => {
  return(
    <svg style={style} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
      <path d="M64 328v48c0 4.4 3.6 8 8 8h248v64l128-96-128-96v64H72c-4.4 0-8 3.6-8 8z"/>
      <path d="M448 184v-48c0-4.4-3.6-8-8-8H192V64L64 160l128 96v-64h248c4.4 0 8-3.6 8-8z"/>
    </svg>
  )
}

