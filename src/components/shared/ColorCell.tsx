import React, {ReactNode} from 'react'
import styled from "styled-components"

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
        {process.browser && <StyledColorCell
            //@ts-ignore
            //TODO FIX
            cellColor={color}
            onContextMenu={onClick}
        >
          {children}
        </StyledColorCell>
        }
      </OutlineWrapper>
    </CellWrapper>
  )
}

const CellWrapper = styled.div`
  z-index: 100;
`

const OutlineWrapper = styled.div<{outline?: boolean}>`
    cursor: ${props => props.outline ? "default" : "pointer"};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.7em;
    background: ${ props => props.outline &&
        "conic-gradient(hsla(0, 37%, 52%, 1), " +
        "hsla(120, 37%, 53%, 1), " +
        "hsla(237, 40%, 54%, 1))"
    };
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
