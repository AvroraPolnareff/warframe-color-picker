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
    padding: 0.5rem 0.35rem;
    border-radius: 1em;
    background-color: ${props => props.theme.colors.windowBackground};
    color: ${props => props.theme.colors.primaryText};
    ${props => props.width ? `width: ${props.width}rem;`: ""}
    ${props => props.height ? `height: ${props.height}rem;`: ""}
`

const WindowBorder = styled.div`
    padding: 4px 16px 16px 4px;
    background-color: ${props => props.theme.colors.border};
    border-radius: 1em;
    width: fit-content;
`