import React, {ReactNode, useContext} from "react";
import styled from "styled-components";
import {SettingsContext} from "../../providers/SettingsProvider";

interface ModalProps {
  width?: number
  height?: number
  show: boolean
  name: string
  description: string
  onExit: () => void
  children: ReactNode
}

export const Modal = (
  {
    show,
    width,
    height,
    name,
    description,
    onExit,
    children
  }: ModalProps
) => {
  const {theme} = useContext(SettingsContext)
  return (
    <StyledModal show={show}>
      <WindowWrapper width={width} height={height}>
        <Borders>
          <TopBar>
            <Header>
              {name}<span style={{fontWeight: "normal"}}> // {description}</span>
            </Header>
            <ExitButton mode={theme} onClick={onExit}/>
          </TopBar>
          <ModalContent>
            {children}
          </ModalContent>
        </Borders>
      </WindowWrapper>
    </StyledModal>
  )
}

const StyledModal = styled.div<{show: boolean}>`
  width: 100%;
  height: 100%;
  z-index: 100;
  position: fixed;
  display: ${props => props.show ? "block" : "none"};
  left: 0; top: 0;
  overflow: auto;
  background-color:${({theme}) => theme.mode === "light" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"};
  
`

const WindowWrapper = styled.div<{width?: number, height?: number}>`
  ${props => props.width && `width: ${props.width}em`};
  ${props => props.height && `height: ${props.height}em`};
  margin: 10% auto;
`
const Borders = styled.div`
  background-color: ${props => props.theme.colors.buttons};
  padding: 0.3em 0.35em;
  border-radius: 10px;
`

const ModalContent = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 0.3em;
  padding: 0.4em 0.4em;
  color: ${props => props.theme.colors.darken.textOnBackground}
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.buttons};
  height: 1.2em;
  
`

const Header = styled.div`
  font-weight: bold;
  margin: 0 0.3em;
  font-size: 1rem;
  color: ${({theme}) => theme.colors.textOnButtons};
  text-transform: uppercase;
`

const ExitButton = styled.img.attrs<{ mode: "day" | "night" }>(({mode}) => ({src: `/images/exit-button-${mode}.svg`, alt: ""}))<{ mode: "day" | "night" }>`
  cursor: pointer;
  font-weight: bold;
  border: none;
  height: 1em;
  
`
