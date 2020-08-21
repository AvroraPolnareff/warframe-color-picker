import styled from "styled-components"

interface ButtonProps {
  backgroundColor?: string,
  round?: boolean,
  small?: boolean
}

export const Button = styled.button<ButtonProps>`
  background-color: ${props => props.backgroundColor || "#a5e8e8"};
  color: ${props => props.theme.colors.buttonText};
  font-weight: bold;
  border: 0;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  padding: 0.25em 0.27rem;
  margin: 0 0.08rem;
  text-transform: uppercase;
  transition: border-radius 0.50s linear;
  border-radius: ${props => props.round ? "3em" : "0.25em"};
  ${props => props.small && "font-size: 0.67rem"};
  letter-spacing: 0.035em;
  outline: none;
  transition: box-shadow 0.2s linear;
  
  &:focus {
    box-shadow: 0 0 2pt 1pt #A5E8E8;
    transition: box-shadow 0.2s linear;
  }
`
