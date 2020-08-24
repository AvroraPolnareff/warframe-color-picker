import styled, {css} from "styled-components"
import Color from "color";

interface ButtonProps {
  backgroundColor?: string,
  round?: boolean,
  small?: boolean,
  primary?: boolean,
  success?: boolean,
  warning?: boolean,
}

export const Button = styled.div<ButtonProps>`
  background-color: ${props => props.backgroundColor || props.theme.colors.secondary};
  background-color: ${props => props.primary && props.theme.colors.primary};
  background-color: ${props => props.success && props.theme.colors.success};
  background-color: ${props => props.warning && props.theme.colors.warning};
  color: ${props => props.theme.colors.buttonText};
  font-weight: bold;
  border: 0;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  padding: 0.25em 1.3rem;
  margin: 0 0.5rem;
  text-transform: uppercase;
  transition: border-radius 0.50s linear, box-shadow 0.2s linear, background-color 0.15s linear;
  border-radius: ${props => props.round ? "3em" : "0.25em"};
  ${props => props.small && css`
  font-size: 0.67rem;
  letter-spacing: 0.035em;
  padding: 0.2em 0.4rem;
  margin: 0 0.08rem;
  
  `};
  font-stretch: 50%;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    background-color: ${props => Color(props.theme.colors.secondary).darken(0.2).toString()};
    background-color: ${props => props.primary && Color(props.theme.colors.primary).darken(0.2).toString()};
    background-color: ${props => props.success && props.theme.colors.success};
    background-color: ${props => props.warning && Color(props.theme.colors.warning).darken(0.2).toString()};
  }

  &:focus {
    box-shadow: 0 0 2pt 1pt #A5E8E8;
    transition: box-shadow 0.2s linear;
  }
`
