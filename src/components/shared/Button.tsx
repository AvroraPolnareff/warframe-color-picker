import styled from "styled-components"

interface ButtonProps {
  backgroundColor: string,
  selected: boolean
}

export const Button = styled.button<ButtonProps>`
  background-color: ${props => props.backgroundColor || "#a5e8e8"};
  color: ${props => props.theme.colors.buttonText};
  font-weight: 600;
  border: 0;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  padding: 4px 14px;
  text-transform: uppercase;
  transition: border-radius 0.50s linear;
  border-radius: ${props => props.selected ? "3em" : "0.25em"};
`
