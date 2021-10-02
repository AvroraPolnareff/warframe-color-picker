import React, {ReactNode} from 'react'
import styled from "styled-components"

export interface LinkProps {
  width?: number
  height?: number
  icon?: string
  href: string
  children?: ReactNode
}

export const Link = (
  {
    children,
    width,
    height,
    icon,
    href
  }: LinkProps
) => {
  return (
    <WindowBorder width={width} height={height} href={href} target="_blank" rel="noopener noreferrer">
      <Content width={width} height={height}>
        {icon ?
            <Icon src={icon} alt=""/>
          : <span style={{fontWeight: 900, fontSize: "1.6em"}}>{children}</span>}
      </Content>
    </WindowBorder>

  )
}

const Icon = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const Content = styled.div<{width?: number, height?: number}>`
  padding: 0.3rem 0.4rem;
  border-radius: 0.54em;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.secondary};
  margin: 0.25em 0.2em 0.2em 0.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.width ? `width: ${props.width}em;`: ""}
  ${props => props.height ? `height: ${props.height}em;`: ""}
  transition: all 0.2s ease-in-out;
  
  &:hover {
    ${props => props.width ? `width: ${props.width + 0.4}em;`: ""}
    ${props => props.height ? `height: ${props.height + 0.4}em;`: ""}
  }
  
`

const WindowBorder = styled.a<{width?: number, height?: number}>`
  display: block;
  background-color: ${props => props.theme.colors.tertiary};
  border-radius: 0.8em;
  margin: 0.5em;
  width: ${({width}) => width && width + 0.25 + 0.7}em;
  height: ${({height}) => height && height + 0.25 + 0.8}em;
  text-decoration: none;

`
