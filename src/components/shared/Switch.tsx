import React, {FC} from "react";
import styled from "styled-components";
import Color from "color";


interface SwitchProps {
  switched: boolean,
  width: number,
  onClick: () => void,
  leftText: string,
  rightText: string
}

export const Switch : FC<SwitchProps> = ({switched, width, onClick, leftText, rightText}) => {
  const onTextClick = (type: boolean) => {
    if (switched !== type) {
      onClick()
    }
  }
  return (
    <Wrapper width={width}>
      
      <Selection switched={switched} width={width}/>
      <FlexWrapper>
        <LeftText onClick={() => onTextClick(false)}>{leftText}</LeftText>
        <RightText onClick={() => onTextClick(true)}>{rightText}</RightText>
        
      </FlexWrapper>
      
    </Wrapper>
      
  )
}

const offset = 0.13
const height = 0.9
const borderRadius = 2

const Selection = styled.div<{switched: boolean, width: number}>`
  position: absolute;
  transition: transform 0.3s cubic-bezier(0,1,0.5,1);
  width: ${props => props.width / 2 - offset }rem;
  height: ${height}rem;
  border: ${offset }rem solid ${props => props.theme.colors.switch.leftText};
  border-radius: ${borderRadius}rem;
  background: ${props => props.theme.colors.primary};
  
  ${props => !props.switched ?
  `transform: translate3d(0,0,0)`
  : `transform: translate3d(${ props.width - (props.width / 2  /*can-toggle-offset*/ )}rem,0,0);`
  }
  
`

const LeftText = styled.div`
  color: ${props => props.theme.colors.switch.leftText};
  z-index: 1;
  text-transform: uppercase;
  user-select: none;
  
`
const RightText = styled.div`
  color: ${props => props.theme.colors.switch.rightText};
  z-index: 1;
  text-transform: uppercase;
  user-select: none;
  
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: inherit;
`

const Wrapper = styled.div.attrs(props => ({tabIndex: 0}))<{ width: number}>`
  font-weight: bold;
  position: relative;
  padding: ${offset}rem;
  background: ${props => props.theme.colors.secondary};
  border-radius: ${borderRadius}rem;
  width: ${props => props.width + offset}rem;
  height: ${height + offset*2 }rem;
  cursor: pointer;
  transition: background-color 0.15s linear;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  
  &:hover  {
    background-color: ${props => Color(props.theme.colors.secondary).darken(0.2).toString()};
  }
  &:focus {
    box-shadow: 0 0 2pt 1pt #A5E8E8;
    transition: box-shadow 0.1s linear;
  }

`













