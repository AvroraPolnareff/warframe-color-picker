import styled, {css} from "styled-components";

interface BadgeProps {
  color?: string,
  width?: number,
  hoverable?: boolean,
  selected?: boolean,
}

export const Badge = styled.div<BadgeProps>`
  background-color: ${props => props.color || props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  padding: 0.1em 0.45em;
  
  margin: 0 0.2em;
  text-align: center;
  border-radius: 0.6em;
  font-weight: 700;
  font-size: 0.8rem;
  ${props => props.width && `min-width: ${props.width}em`};
  transition: background-color 0.15s linear;
  ${props => props.hoverable && css`
    &:hover {
      background-color: ${props => props.theme.colors.darken.secondary};
    }
  `}
`

