import React, {FC} from "react";
import styled from "styled-components";
import exitButton from "../../assets/exitButton.svg"

interface ModalProps {
  width?: number, height?: number, show: boolean, name: string, description: string, onExit: () => void
}

export const Modal : FC<ModalProps> = ({show, width, height, name, description, onExit, children}) => {
  return (
    <StyledModal show={show}>
      <WindowWrapper width={width} height={height}>
        <Borders>
          <TopBar>
            <Header>
              {name}<span style={{fontWeight: "normal"}}> // {description}</span>
            </Header>
            <ExitButton onClick={onExit}/>
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
  z-index: 2;
  position: fixed;
  display: ${props => props.show ? "block" : "none"};
  left: 0; top: 0;
  overflow: auto;
  background-color: rgba(255,255,255,0.7);
  
`

const WindowWrapper = styled.div<{width?: number, height?: number}>`
  ${props => props.width && `width: ${props.width}rem`};
  margin: 10% auto;
`
const Borders = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  padding: 4px 5px;
  border-radius: 10px;
`

const ModalContent = styled.div`
  background-color: white;
  border-radius: 6px;
  padding: 8px 8px;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.tertiary};
  height: 1.2rem;
  
`

const Header = styled.div`
  font-weight: bold;
  margin: 0 0.5rem;
  font-size: 0.9rem;
  color: white;
  text-transform: uppercase;
`

const ExitButton = styled.img.attrs((props) => ({src: exitButton}))`
  cursor: pointer;
  font-weight: bold;
  border: none;
  font-size: 2rem;
  height: 1rem;
  
`

const Buttons = styled.div`

`
