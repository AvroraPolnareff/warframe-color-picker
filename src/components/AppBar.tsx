import React, {FC} from 'react';
import styled from "styled-components/macro";


export const AppBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-items: center;
  height: 2em;
`

export const Container = styled.div`
  display: flex;
  width: max-content;
  height: max-content;
  color: transparent;
  
`

export const Entry: FC<{onClick?: (e: React.MouseEvent) => void}> = ({children, onClick}) => {
  return (
    <EntryWrapper onClick={onClick}>
      <StyledEntry>{children}</StyledEntry>
    </EntryWrapper>
  )
}

const EntryWrapper = styled.div`
  transform: translate(0, -40%);
  padding-bottom: 1em;
  :hover {
    color: ${({theme}) => theme.colors.windowBackground};
    transform: translate(0, 0);
  }
  transition: transform 0.3s ease;
`

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
  
  :hover {
    background-color: ${({theme}) => theme.colors.primary};
  }
`
