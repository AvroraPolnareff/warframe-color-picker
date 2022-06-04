import styled, {css} from "styled-components"
import Color from "color";

interface ButtonProps {
  backgroundColor?: string,
  round?: boolean,
  small?: boolean,
  big?: boolean,
  primary?: boolean,
  success?: boolean,
  warning?: boolean,
}

export const Button = styled.div<ButtonProps>`
  user-select: none;
  background-color: ${props => props.backgroundColor || props.theme.colors.buttons};
  background-color: ${props => props.primary && props.theme.colors.primary};
  background-color: ${props => props.success && props.theme.colors.success};
  background-color: ${props => props.warning && props.theme.colors.warning};
  color: ${props => props.theme.colors.background};
  font-weight: bold;
  border: 0;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  padding: 0.25em 1.45em;
  margin: 0 0.5em;
  text-transform: uppercase;
  transition: border-radius 0.50s linear, box-shadow 0.2s linear, background-color 0.15s linear;
  border-radius: ${props => props.round ? "3em" : "0.25em"};
  font-stretch: 50%;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  
  ${props => props.small && css`
  font-size: 0.8rem;
  letter-spacing: 0.035em;
  padding: 0.15em 0.45em;
  margin: 0;
  `};

  ${props => props.big && css`
  font-size: 1.2rem;
  padding: 0.25em 1.45em;
  `};
  
  &:hover {
    background-color: ${props => Color(props.theme.colors.buttons).darken(0.2).toString()};
    background-color: ${props => props.primary && Color(props.theme.colors.primary).darken(0.2).toString()};
    background-color: ${props => props.success && props.theme.colors.success};
    background-color: ${props => props.warning && Color(props.theme.colors.warning).darken(0.2).toString()};
  }

  &:focus {
    box-shadow: 0 0 2pt 1pt #A5E8E8;
    transition: box-shadow 0.2s linear;
  }
`
