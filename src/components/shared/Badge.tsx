import styled, {css} from "styled-components";

export const Badge = styled.div<{color?: string, width?: number, hoverable?: boolean, selected?: boolean}>`
  background-color: ${props => props.color || props.theme.colors.secondary};
  color: ${props => props.theme.colors.badgeText};
  padding: 0.1em 0.4em;
  margin: 0 0.2em;
  text-align: center;
  border-radius: 0.6em;
  font-weight: 700;
  font-size: 0.8em;
  ${props => props.width && `width: ${props.width}rem`};
  transition: background-color 0.15s linear;
  ${props => props.hoverable && css`
    &:hover {
      background-color: ${props => props.theme.colors.darken.secondary};
    }
  `}
`

