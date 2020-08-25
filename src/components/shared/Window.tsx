import React from 'react'
import styled from "styled-components"

export const Window: React.FC<{width?: number, height?: number}> = ({children, width, height}) => {
  return (
      <WindowBorder width={width} height={height}>
        <Content >
          {children}
        </Content>
    </WindowBorder>

  )
}

const Content = styled.div`
    padding: 0.3rem 0.4rem;
    border-radius: 0.54em;
    background-color: ${props => props.theme.colors.windowBackground};
    color: ${props => props.theme.colors.secondary};
    margin: 0.27em 0.81em 0.81em 0.27em;
    
`

const WindowBorder = styled.div<{width?: number, height?: number}>`
    
    background-color: ${props => props.theme.colors.border};
    border-radius: 0.8em;
    margin: 0.5rem;
    ${props => props.width ? `width: ${props.width}em;`: ""}
    ${props => props.height ? `height: ${props.height}em;`: ""}
`