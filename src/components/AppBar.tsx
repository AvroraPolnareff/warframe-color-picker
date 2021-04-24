import React, {ReactNode} from 'react';
import styled from "styled-components/macro";


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
    onClick
  }: {
    onClick?: (e: React.MouseEvent) => void,
    children: ReactNode
  }
) => {
  return (
    <EntryWrapper role="button" onClick={onClick}>
      <StyledEntry>{children}</StyledEntry>
    </EntryWrapper>
  )
}

export const StyledEntry = styled.div`
  padding: 0.05em 0.3em;
  background-color: ${({theme}) => theme.colors.secondary};
  border-bottom-left-radius: 0.7em;
  border-bottom-right-radius: 0.7em;
  user-select: none;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  width: 9em;
  
  transition: background-color 0.3s ease;
  
  & + & {
    margin-left: 0.5em;
  }
`

const EntryWrapper = styled.div`
  transform: translate(0, -35%);
  padding-bottom: 1.5em;
  :hover {
    color: ${({theme}) => theme.colors.windowBackground};
    transform: translate(0, 0);
  }
  transition: transform 0.3s ease;

  :hover ${StyledEntry} {
    background-color: ${({theme}) => theme.colors.darken.secondary};
  }
`


