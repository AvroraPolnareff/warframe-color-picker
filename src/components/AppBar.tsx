import React, {FC} from 'react';
import styled from "styled-components";

export const AppBar : FC = () => {
  return (
    <StyledAppBar>
      <Entry></Entry>
      <Entry></Entry>
      <Entry></Entry>
      <Entry></Entry>
      <Entry></Entry>
      <Entry></Entry>
    </StyledAppBar>
  )
}

const StyledAppBar = styled.div`
  height: 4.21em;
  width: max-content;
  margin: 0 auto;
  background: ${props => props.theme.colors.tertiary};
  display: flex;
  padding: 0 1em;
  border-bottom-left-radius: 1.34em;
  border-bottom-right-radius: 1.34em;
`

const Entry = styled.div`
  content: ' ';
  width: 3.2em;
  height: 3.2em;
  margin: 0.42em 0.7em;
  background-color: white;
  border-radius: 0.85em;
`