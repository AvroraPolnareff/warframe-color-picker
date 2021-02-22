import React, {FC} from 'react';
import styled from "styled-components";


export const AppBar = styled.div`
  display: flex;
  justify-content: center;
  height: 2em;
`

export const CenterContainer = styled.div`
  display: flex;
  width: max-content;
  height: max-content;
  color: transparent;
  transform: translate(0, -70%);
  transition: all 0.3s ease;
  :hover {
    color: ${({theme}) => theme.colors.windowBackground};
    transform: translate(0, 0);
  }
`

export const Entry = styled.div`
  padding: 0.05em 0.3em;
  background-color: ${({theme}) => theme.colors.secondary};
  border-bottom-left-radius: 0.7em;
  border-bottom-right-radius: 0.7em;
  cursor: pointer;
  transition: background-color 0.15s linear;
  font-weight: 500;
  
  & + & {
    margin-left: 0.5em;
  }
  
  :hover {
    background-color: ${({theme}) => theme.colors.primary};
  }
`
