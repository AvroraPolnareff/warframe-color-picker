import React from 'react'
import styled from "styled-components"

export const Window: React.FC = ({children}) => {
  return (
      <WindowBorder>
        <Content>
          {children}
        </Content>
    </WindowBorder>

  )
}

const Content = styled.div`
    padding: 0.5rem 0.35rem;
    border-radius: 1em;
    background-color: ${props => props.theme.colors.windowBackground};
    color: ${props => props.theme.colors.primaryText};
`

const WindowBorder = styled.div`
    padding: 4px 16px 16px 4px;
    background-color: ${props => props.theme.colors.border};
    border-radius: 1em;
    width: fit-content;
`