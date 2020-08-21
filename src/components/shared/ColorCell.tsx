import React from 'react'
import styled, {keyframes} from "styled-components"

interface ColorCellProps {
  outline?: boolean;
  color: string;
  onClick?: () => void
}

export const ColorCell : React.FC<ColorCellProps> = ({outline, color, onClick}) => {
  return (<OutlineWrapper outline={outline}><StyledColorCell onClick={onClick} color={color}/></OutlineWrapper>)
}

const gradient = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 100% 50%;
  }
`

const OutlineWrapper = styled.div<{outline?: boolean}>`
    cursor: ${props => props.outline ? "default" : "pointer"};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0;
    border-radius: 0.7rem;
    height: 1.20rem;
    background: ${ props => props.outline && "linear-gradient(30deg, rgba(233,165,165,1) 0%, rgba(184,193,192,1) 25%, rgba(101,192,224,1) 50%, rgba(174,162,219,1) 75%, rgba(129,193,217,1) 100%)"};
    background-size: 400% 400%;
    animation: ${gradient} 3s ease infinite;
`

const StyledColorCell = styled.div.attrs<{color: string}>((props) => ({
  style: {background: props.color}
}))`
    content: " ";
    //background-color: #000000;
    height: 0.9rem;
    margin: 0.09rem 0.16rem;
    width: 1.1rem;
    border-radius: 0.55rem;
    /*box-shadow:
        0 1px 2px #fff, /*bottom external highlight*/

    /*    inset 0.06rem 0.06rem 1px rgba(255,255,255,0.8); /*top internal highlight*/
`