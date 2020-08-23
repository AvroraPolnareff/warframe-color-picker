import React from 'react'
import styled from "styled-components"

export const Window: React.FC<{width?: number, height?: number}> = ({children, width, height}) => {
  return (
      <WindowBorder>
        <Content width={width} height={height}>
          {children}
        </Content>
    </WindowBorder>

  )
}

const Content = styled.div<{width?: number, height?: number}>`
    padding: 0.3rem 0.35rem;
    border-radius: 0.5em;
    background-color: ${props => props.theme.colors.windowBackground};
    color: ${props => props.theme.colors.secondary};
    ${props => props.width ? `width: ${props.width}rem;`: ""}
    ${props => props.height ? `height: ${props.height}rem;`: ""}
`

const WindowBorder = styled.div`
    padding: 4px 12px 12px 4px;
    background-color: ${props => props.theme.colors.border};
    border-radius: 0.8em;
    width: fit-content;
    margin: 0.5rem;
`