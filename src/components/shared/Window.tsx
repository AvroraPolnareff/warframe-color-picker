import React, {CSSProperties, ReactNode} from 'react'
import styled from "styled-components/macro"

export const Window = (
  {
    children,
    width,
    height,
    style
  }: {
    width?: number,
    height?: number,
    style?: CSSProperties,
    children: ReactNode
  }
) => {
  return (
      <WindowBorder width={width} height={height} style={style}>
        <Content >
          {children}
        </Content>
    </WindowBorder>

  )
}

const Content = styled.div`
    padding: 0.3em 0.5em;
    border-radius: 0.54em;
    background-color: ${props => props.theme.colors.windowBackground};
    color: ${props => props.theme.colors.secondary};

    
`

const WindowBorder = styled.div<{width?: number, height?: number}>`
    padding: 0.27em 0.7em 0.7em 0.27em;
    background-color: ${props => props.theme.colors.border};
    border-radius: 0.8em;
    margin: 0.5rem;
    ${props => props.width ? `width: ${props.width}em;`: ""}
    ${props => props.height ? `height: ${props.height}em;`: ""}
`
