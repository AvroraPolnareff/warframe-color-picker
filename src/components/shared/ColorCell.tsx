import React, {ReactNode} from 'react'
import styled, {keyframes} from "styled-components"

interface ColorCellProps {
  outline?: boolean
  color: string
  onClick?: (e: React.MouseEvent) => void
  children?: ReactNode
}

export const ColorCell = (
  {
    outline,
    color,
    onClick,
    children
  }: ColorCellProps
) => {
  return (
    <CellWrapper onClick={onClick}>
      <OutlineWrapper outline={outline}>
        {process.browser && <StyledColorCell cellColor={color} onContextMenu={onClick}>
          {children}
        </StyledColorCell>
        }
      </OutlineWrapper>
    </CellWrapper>
  )
}

const gradient = keyframes`
  0% {
    background-position: 0 0;
  }
  25% {
    background-position: 50% 100%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0 0;
  }
`

const CellWrapper = styled.div`
  z-index: 100;
`

const OutlineWrapper = styled.div<{outline?: boolean}>`
    cursor: ${props => props.outline ? "default" : "pointer"};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.7em;
    background: repeat ${ props => props.outline &&
        "linear-gradient(120deg, rgba(233,165,165,1) 0%, " +
        "rgba(184,193,192,1) 25%, rgba(101,192,224,1) 50%, " +
        "rgba(174,162,219,1) 75%, rgba(129,193,217,1) 100%)"
    };
    background-size: 900% 900%;
    animation: ${gradient} 10s ease infinite;
    -webkit-tap-highlight-color: transparent;
`

const StyledColorCell = styled.div.attrs<{cellColor?: string}>(({cellColor}) => ({
  style: {background: cellColor || `repeat center/150% url("/images/no-color-grid-small.png")`}
}))`
    content: " ";
    height: 1.07em;
    margin: 0.15em;
    width: 1.25em;
    border-radius: 0.55em;
`
