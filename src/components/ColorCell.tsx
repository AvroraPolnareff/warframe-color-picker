import React from 'react'
import styled from "styled-components"

interface ColorCellProps {
  outline: boolean;
  color: string;
}

export const ColorCell : React.FC<ColorCellProps> = ({outline, color}) => {
  return (<OutlineWrapper outline={outline}><StyledColorCell color={color}/></OutlineWrapper>)
}

const OutlineWrapper = styled.div<{outline: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.2rem;
    border-radius: 0.40rem;
    height: 1.1rem;
    background-color: ${props => props.outline && props.theme.colors.border};
`

const StyledColorCell = styled.div`
    content: " ";
    background-color: ${props => props.color || "#000000"};
    height: 0.9rem;
    margin: 0 0.2rem;
    width: 1.1rem;
    border-radius: 0.55rem;
    /*box-shadow:
        0 1px 2px #fff, /*bottom external highlight*/

    /*    inset 0.06rem 0.06rem 1px rgba(255,255,255,0.8); /*top internal highlight*/
`