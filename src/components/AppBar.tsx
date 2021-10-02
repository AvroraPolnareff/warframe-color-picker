import React, {ReactNode} from 'react';
import styled from "styled-components";


export const AppBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-items: center;
  height: 2em;
  z-index: 100;
`

export const Container = styled.div`
  display: flex;
  width: max-content;
  height: max-content;
  color: transparent;
  
`

export const Entry = (
  {
    children,
    onClick,
    active,
  }: {
    onClick?: (e: React.MouseEvent) => void,
    children: ReactNode,
    active?: boolean,
  }
) => {
  return (
    <EntryWrapper role="button" onClick={onClick}>
      <StyledEntry active={active}>{children}</StyledEntry>
    </EntryWrapper>
  )
}

export const StyledEntry = styled.div<{active?: boolean}>`
  padding: 0.05em 0.3em;
  background-color: ${({theme, active}) => active ? theme.colors.primary : theme.colors.secondary};
  border-bottom-left-radius: 0.7em;
  border-bottom-right-radius: 0.7em;
  user-select: none;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  width: 9em;

  :hover {
    background-color: ${({theme, active}) => active ? theme.colors.darken.primary : theme.colors.darken.secondary};
  }
  
  transition: background-color 0.3s ease;
`

const EntryWrapper = styled.div`
  color: ${({theme}) => theme.colors.background};
  transition: transform 0.3s ease;

  & + & {
    margin-left: 0.5em;
  }
`


