import React from "react"
import styled, {css} from "styled-components";

export const Input = styled.input<{size?: "normal" | "big", fullWidth?: boolean}>`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.buttons};
  color: ${props => props.theme.colors.textOnButtons};
  padding: 0.35em 0.45em;
  border-radius: 0.6em;
  font-weight: 500;
  font-size: 0.9rem;
  width: 5em;
  border: none;
  transition: background-color 0.15s linear;
  text-overflow: ellipsis;
  
  ${({fullWidth}) => fullWidth && css`
    width: 100%;
  `}

  ${({size}) => size === "big" && css`
    font-size: 1em;
  `}

  &:focus {
    outline: none;
  }
`
